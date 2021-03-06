# -*- coding: utf-8 -*-
import logging
from flask import jsonify, request
import flask_login
import string

from server import app, db, mc
from server.cache import cache
from server.util.common import _media_ids_from_sources_param, _media_tag_ids_from_collections_param
from server.util.request import form_fields_required, arguments_required, api_error_handler
from server.auth import user_mediacloud_key, user_admin_mediacloud_client, user_mediacloud_client, user_name, is_user_logged_in
from server.views.topics.apicache import cached_topic_timespan_list
from server.views.topics import access_public_topic

logger = logging.getLogger(__name__)


@app.route('/api/topics/list', methods=['GET'])
@api_error_handler
def topic_list():
    if not is_user_logged_in():
        topics = sorted_public_topic_list()
        return jsonify({'topics': {'public': topics}})
    else:
        user_mc = user_admin_mediacloud_client()
        link_id = request.args.get('linkId')
        topics = user_mc.topicList(link_id=link_id, limit=50)
        _add_user_favorite_flag_to_topics(topics['topics'])
        return jsonify({'topics': {'personal': topics}})


@app.route('/api/topics/queued-and-running', methods=['GET'])
@api_error_handler
def does_user_have_a_running_topic():
    user_mc = user_mediacloud_client()
    queued_and_running_topics = []
    more_topics = True
    link_id = None
    while more_topics:
        results = user_mc.topicList(link_id=link_id, limit=100)
        topics = results['topics']
        queued_and_running_topics += [t for t in topics if t['state'] in ['running', 'queued']
                                      and t['user_permission'] in ['admin']]
        more_topics = 'next' in results['link_ids']
        if more_topics:
            link_id = results['link_ids']['next']
    return jsonify(queued_and_running_topics)


@app.route('/api/topics/listFilterCascade', methods=['GET'])
@api_error_handler
def topic_filter_cascade_list():
    public_topics = sorted_public_topic_list()

    # for t in sorted_public_topics:
    #    t['detailInfo'] = get_topic_info_per_snapshot_timespan(t['topics_id'])

    # check if user had favorites or personal
    user_topics = []
    favorited_topics = []
    results = {
        'link_ids': []
    }
    if is_user_logged_in():
        user_mc = user_admin_mediacloud_client()
        link_id = request.args.get('linkId')
        results = user_mc.topicList(link_id=link_id, limit=105)
        user_topics = results['topics']
        favorite_topic_ids = db.get_users_lists(user_name(), 'favorite'
                                                             'Topics')
        # mark all the public topics as favorite or not
        for t in public_topics:
            t['isFavorite'] = t['topics_id'] in favorite_topic_ids
        # mark all the user's topics as favorite or not
        for t in user_topics:
            t['isFavorite'] = t['topics_id'] in favorite_topic_ids
        # fill in the list of favorite topics (need to hit server because they might no be in the other results)
        favorited_topics = [user_mc.topic(tid) for tid in favorite_topic_ids]
        for t in favorited_topics:
            t['isFavorite'] = True
    return jsonify({'topics': {'favorite': favorited_topics, 'personal': user_topics, 'public': public_topics}, 'link_ids': results['link_ids']})


def sorted_public_topic_list():
    # needs to support logged in or not
    if is_user_logged_in():
        local_mc = user_mediacloud_client()
    else:
        local_mc = mc
    public_topics_list = local_mc.topicList(public=True, limit=50)['topics']
    return sorted(public_topics_list, key=lambda t: t['name'].lower())


@app.route('/api/topics/<topics_id>/summary', methods=['GET'])
@api_error_handler
def topic_summary(topics_id):
    topic = _topic_summary(topics_id)
    return jsonify(topic)


def _topic_summary(topics_id):
    if access_public_topic(topics_id):
        local_mc = mc
    elif is_user_logged_in():
        local_mc = user_admin_mediacloud_client()
    else:
        return jsonify({'status': 'Error', 'message': 'Invalid attempt'})
    topic = local_mc.topic(topics_id)
    # add in snapshot and latest snapshot job status
    topic['snapshots'] = {
        'list': local_mc.topicSnapshotList(topics_id),
        'jobStatus': mc.topicSnapshotGenerateStatus(topics_id)['job_states']    # need to know if one is running
    }
    if is_user_logged_in():
        _add_user_favorite_flag_to_topics([topic])
    return topic


def _add_user_favorite_flag_to_topics(topics):
    user_favorited = db.get_users_lists(user_name(), 'favoriteTopics')
    for t in topics:
        t['isFavorite'] = t['topics_id'] in user_favorited
    return topics


@app.route('/api/topics/<topics_id>/snapshots/list', methods=['GET'])
@flask_login.login_required
@api_error_handler
def topic_snapshots_list(topics_id):
    user_mc = user_admin_mediacloud_client()
    snapshots = user_mc.topicSnapshotList(topics_id)
    snapshot_status = mc.topicSnapshotGenerateStatus(topics_id)['job_states']    # need to know if one is running
    return jsonify({'list': snapshots, 'jobStatus': snapshot_status})


@app.route('/api/topics/<topics_id>/snapshots/generate', methods=['POST'])
@flask_login.login_required
@api_error_handler
def topic_snapshot_generate(topics_id):
    user_mc = user_admin_mediacloud_client()
    results = user_mc.topicGenerateSnapshot(topics_id)
    return jsonify(results)


@app.route('/api/topics/<topics_id>/snapshots/<snapshots_id>/timespans/list', methods=['GET'])
@flask_login.login_required
@api_error_handler
def topic_timespan_list(topics_id, snapshots_id):
    foci_id = request.args.get('focusId')
    timespans = cached_topic_timespan_list(user_mediacloud_key(), topics_id, snapshots_id, foci_id)
    return jsonify({'list':timespans})


@app.route('/api/topics/<topics_id>/favorite', methods=['PUT'])
@flask_login.login_required
@form_fields_required('favorite')
@api_error_handler
def topic_set_favorited(topics_id):
    favorite = int(request.form["favorite"])
    username = user_name()
    if favorite == 1:
        db.add_item_to_users_list(username, 'favoriteTopics', int(topics_id))
    else:
        db.remove_item_from_users_list(username, 'favoriteTopics', int(topics_id))
    return jsonify({'isFavorite': favorite == 1})


@app.route('/api/topics/favorite', methods=['GET'])
@flask_login.login_required
@api_error_handler
def favorite_topics():
    user_mc = user_admin_mediacloud_client()
    user_favorited = db.get_users_lists(user_name(), 'favoriteTopics')
    favorited_topics = [user_mc.topic(topic_id) for topic_id in user_favorited]
    for t in favorited_topics:
        t['isFavorite'] = True
        t['detailInfo'] = get_topic_info_per_snapshot_timespan(t['topics_id'])
    return jsonify({'topics': favorited_topics})


@app.route('/api/topics/public', methods=['GET'])
@api_error_handler
@cache
def public_topics():
    public_topics_list = sorted_public_topic_list()
    return jsonify({"topics": public_topics_list})


def get_topic_info_per_snapshot_timespan(topic_id):
    local_mc = user_admin_mediacloud_client()
    snapshots = {
        'list': local_mc.topicSnapshotList(topic_id),
    }
    most_recent_running_snapshot = {}
    overall_timespan = {}
    for snp in snapshots['list']:
        if snp['searchable'] == 1 and snp['state'] == "completed":
            most_recent_running_snapshot = snp
            timespans = cached_topic_timespan_list(user_mediacloud_key(), topic_id, most_recent_running_snapshot['snapshots_id'])
            for ts in timespans:
                if ts['period'] == "overall":
                   overall_timespan = ts

    return {'snapshot': most_recent_running_snapshot, 'timespan': overall_timespan}


@app.route('/api/topics/<topics_id>/update', methods=['PUT'])
@flask_login.login_required
@form_fields_required('name', 'description', 'solr_seed_query', 'start_date', 'end_date')
@api_error_handler
def topic_update(topics_id):

    user_mc = user_admin_mediacloud_client()
    # top five cannot be empty fyi
    args = {
        'name': request.form['name'],
        'description': request.form['description'],
        'solr_seed_query': request.form['solr_seed_query'],
        'start_date': request.form['start_date'],
        'end_date': request.form['end_date'],
        'is_public': request.form['is_public'] if 'is_public' in request.form else None,
        'is_logogram': request.form['is_logogram'] if 'is_logogram' in request.form else None,
        'ch_monitor_id': request.form['ch_monitor_id'] if len(request.form['ch_monitor_id']) > 0 and request.form['ch_monitor_id'] != 'null' else None,
        'max_iterations': request.form['max_iterations'] if 'max_iterations' in request.form else None,
        'twitter_topics_id': request.form['twitter_topics_id'] if 'twitter_topics_id' in request.form else None, 
    }

    # parse out any sources and collections to add
    media_ids_to_add = _media_ids_from_sources_param(request.form['sources[]'])
    tag_ids_to_add = _media_tag_ids_from_collections_param(request.form['collections[]'])
    # hack to support twitter-only topics
    if (len(media_ids_to_add) is 0) and (len(tag_ids_to_add) is 0):
        media_ids_to_add = None
        tag_ids_to_add = None

    result = user_mc.topicUpdate(topics_id,  media_ids=media_ids_to_add, media_tags_ids=tag_ids_to_add, **args)

    return topic_summary(result['topics'][0]['topics_id']) # give them back new data, so they can update the client


@app.route("/api/topics/<topics_id>/spider", methods=['POST'])
@flask_login.login_required
@api_error_handler
def topic_spider(topics_id):
    user_mc = user_admin_mediacloud_client()
    spider_job = user_mc.topicSpider(topics_id) # kick off a spider, which will also generate a snapshot
    return jsonify(spider_job)


@app.route('/api/topics/search', methods=['GET'])
@flask_login.login_required
@arguments_required('searchStr')
@api_error_handler
def topic_search():
    search_str = request.args['searchStr']
    user_mc = user_admin_mediacloud_client()
    matching_topics = user_mc.topicList(name=search_str, limit=15)
    results = map(lambda x: {'name': x['name'], 'id': x['topics_id']}, matching_topics['topics'])
    return jsonify({'topics': results})


@app.route('/api/topics/admin/list', methods=['GET'])
@flask_login.login_required
@api_error_handler
def topic_admin_list():
    user_mc = user_admin_mediacloud_client()
    # if a non-admin user calls this, using user_mc grantees this won't be a security hole
    # but for admins this will return ALL topics
    topics = user_mc.topicList(limit=500)
    return jsonify(topics)
