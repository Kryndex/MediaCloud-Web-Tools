# -*- coding: utf-8 -*-
import logging
from flask import jsonify, request
import flask_login
from server import app, db, mc
from server.auth import user_mediacloud_key, user_admin_mediacloud_client, user_mediacloud_client
from server.util.request import form_fields_required, api_error_handler, arguments_required
from server.util.geo import COUNTRY_GEONAMES_ID_TO_APLHA3, HIGHCHARTS_KEYS
import server.util.tags as tag_utl
from server.views.explorer import SAMPLE_SEARCHES, concatenate_query_for_solr, parse_query_with_args_and_sample_search
import datetime
# load the shared settings file

logger = logging.getLogger(__name__)


@app.route('/api/explorer/demo/geo-tags/counts', methods=['GET'])
def api_explorer_demo_geotag_count():

    current_search = SAMPLE_SEARCHES[int(request.args['search_id'])]['data']
    index = int(request.args['index']) if 'index' in request.args else None

    two_weeks_before_now = datetime.datetime.now() - datetime.timedelta(days=14)
    start_date = two_weeks_before_now.strftime("%Y-%m-%d")
    end_date = datetime.datetime.now().strftime("%Y-%m-%d")

    solr_query = parse_query_with_args_and_sample_search(request.args, current_search)

    res = mc.sentenceFieldCount('*', solr_query, tag_sets_id=tag_utl.GEO_TAG_SET, sample_size=tag_utl.GEO_SAMPLE_SIZE)
    res = [r for r in res if int(r['tag'].split('_')[1]) in COUNTRY_GEONAMES_ID_TO_APLHA3.keys()]
    for r in res:
        geonamesId = int(r['tag'].split('_')[1])
        if geonamesId not in COUNTRY_GEONAMES_ID_TO_APLHA3.keys():   # only include countries
            continue
        r['geonamesId'] = geonamesId    # TODO: move this to JS?
        r['alpha3'] = COUNTRY_GEONAMES_ID_TO_APLHA3[geonamesId]
        r['count'] = (float(r['count'])/float(tag_utl.GEO_SAMPLE_SIZE))    # WTF: why is the API returning this as a string and not a number?
        for hq in HIGHCHARTS_KEYS:
            if hq['properties']['iso-a3'] == r['alpha3']:
                r['iso-a2'] = hq['properties']['iso-a2']
                r['value'] = r['count']
    return jsonify(res)

