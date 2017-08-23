import { createAction } from 'redux-actions';
import { createAsyncAction } from '../../lib/reduxHelpers';
import * as api from '../../lib/serverApi/explorer';

export const UPDATE_TIMESTAMP_FOR_QUERIES = 'UPDATE_TIMESTAMP_FOR_QUERIES';
export const updateTimestampForQueries = createAction(UPDATE_TIMESTAMP_FOR_QUERIES, queries => queries);

export const FETCH_SAMPLE_SEARCHES = 'FETCH_SAMPLE_SEARCHES';
export const fetchSampleSearches = createAsyncAction(FETCH_SAMPLE_SEARCHES, api.fetchSampleSearches);

export const SELECT_SEARCH_BY_ID = 'SELECT_SEARCH_BY_ID';
export const selectBySearchId = createAction(SELECT_SEARCH_BY_ID, searchId => searchId);

export const SELECT_SEARCH_BY_PARAMS = 'SELECT_SEARCH_BY_PARAMS';
export const selectBySearchParams = createAction(SELECT_SEARCH_BY_PARAMS, searchParams => searchParams);


export const FETCH_SAVED_SEARCHES = 'FETCH_SAVED_SEARCHES';
export const fetchSavedSearches = createAsyncAction(FETCH_SAVED_SEARCHES, api.fetchSavedSearches);

export const SELECT_QUERY = 'SELECT_QUERY';
export const selectQuery = createAction(SELECT_QUERY, query => query);

export const ADD_CUSTOM_QUERY = 'ADD_CUSTOM_QUERY';
export const addCustomQuery = createAction(ADD_CUSTOM_QUERY, query => query);

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const updateQuery = createAction(UPDATE_QUERY, query => query);

export const UPDATE_QUERY_COLLECTION_LOOKUP_INFO = 'UPDATE_QUERY_COLLECTION_LOOKUP_INFO';
export const updateQueryCollectionLookupInfo = createAction(UPDATE_QUERY_COLLECTION_LOOKUP_INFO, query => query);

export const UPDATE_QUERY_SOURCE_LOOKUP_INFO = 'UPDATE_QUERY_SOURCE_LOOKUP_INFO';
export const updateQuerySourceLookupInfo = createAction(UPDATE_QUERY_SOURCE_LOOKUP_INFO, query => query);


export const PREPARE_QUERIES = 'PREPARE_QUERIES';
export const prepareQueries = createAsyncAction(PREPARE_QUERIES, api.prepareQueries);

export const FETCH_QUERY_SENTENCE_COUNTS = 'FETCH_QUERY_SENTENCE_COUNTS';
export const fetchQuerySentenceCounts = createAsyncAction(FETCH_QUERY_SENTENCE_COUNTS, api.fetchQuerySentenceCounts, params => params);
export const fetchDemoQuerySentenceCounts = createAsyncAction(FETCH_QUERY_SENTENCE_COUNTS, api.fetchDemoQuerySentenceCounts, params => params);

export const FETCH_QUERY_SAMPLE_STORIES = 'FETCH_QUERY_SAMPLE_STORIES';
export const fetchQuerySampleStories = createAsyncAction(FETCH_QUERY_SAMPLE_STORIES, api.fetchQuerySampleStories, params => params);
export const fetchDemoQuerySampleStories = createAsyncAction(FETCH_QUERY_SAMPLE_STORIES, api.fetchDemoQuerySampleStories, params => params);

export const FETCH_QUERY_STORY_COUNT = 'FETCH_QUERY_STORY_COUNT';
export const fetchQueryStoryCount = createAsyncAction(FETCH_QUERY_STORY_COUNT, api.fetchQueryStoryCount, params => params);
export const fetchDemoQueryStoryCount = createAsyncAction(FETCH_QUERY_STORY_COUNT, api.fetchDemoQueryStoryCount, params => params);

export const FETCH_QUERY_GEO = 'FETCH_QUERY_GEO';
export const fetchQueryGeo = createAsyncAction(FETCH_QUERY_GEO, api.fetchQueryGeo, params => params);
export const fetchDemoQueryGeo = createAsyncAction(FETCH_QUERY_GEO, api.fetchDemoQueryGeo, params => params);

export const FETCH_QUERY_SOURCES = 'FETCH_QUERY_SOURCES';
export const fetchQuerySourcesByIds = createAsyncAction(FETCH_QUERY_SOURCES, api.fetchQuerySourcesByIds, props => props);
export const demoQuerySourcesByIds = createAsyncAction(FETCH_QUERY_SOURCES, api.demoQuerySourcesByIds, props => props);

export const FETCH_QUERY_COLLECTIONS = 'FETCH_QUERY_COLLECTIONS';
export const fetchQueryCollectionsByIds = createAsyncAction(FETCH_QUERY_COLLECTIONS, api.fetchQueryCollectionsByIds, props => props);
export const demoQueryCollectionsByIds = createAsyncAction(FETCH_QUERY_COLLECTIONS, api.demoQueryCollectionsByIds, props => props);

export const SAVE_QUERY_SET = 'SAVE_QUERY_SET';
export const saveQuerySet = createAsyncAction(SAVE_QUERY_SET, api.saveQuerySet, props => props);

export const RESET_QUERIES = 'RESET_QUERIES';
export const resetQueries = createAction(RESET_QUERIES);

export const RESET_SELECTED = 'RESET_SELECTED';
export const resetSelected = createAction(RESET_SELECTED);

export const RESET_SENTENCE_COUNTS = 'RESET_SENTENCE_COUNTS';
export const resetSentenceCounts = createAction(RESET_SENTENCE_COUNTS);

export const RESET_SAMPLES = 'RESET_SAMPLES';
export const resetSamples = createAction(RESET_SAMPLES);

export const RESET_STORY_COUNTS = 'RESET_STORY_COUNTS';
export const resetStoryCounts = createAction(RESET_STORY_COUNTS);

export const RESET_GEO = 'RESET_GEO';
export const resetGeo = createAction(RESET_GEO);
