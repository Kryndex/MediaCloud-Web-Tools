import { createAction } from 'redux-actions';
import { createAsyncAction } from '../../lib/reduxHelpers';
import * as api from '../../lib/serverApi/sources';

export const FETCH_FEATURED_COLLECTIONS_LIST = 'FETCH_FEATURED_COLLECTIONS_LIST';
export const FETCH_POPULAR_COLLECTIONS_LIST = 'FETCH_POPULAR_COLLECTIONS_LIST';
export const FETCH_COLLECTION_TOP_WORDS = 'FETCH_COLLECTION_TOP_WORDS';
export const FETCH_COLLECTION_SENTENCE_COUNT = 'FETCH_COLLECTION_SENTENCE_COUNT';
export const FETCH_COLLECTION_GEO = 'FETCH_COLLECTION_GEO';
export const FETCH_COLLECTION_SOURCE_SENTENCE_COUNTS = 'FETCH_COLLECTION_SOURCE_SENTENCE_COUNTS';
export const FETCH_COLLECTION_SOURCE_SENTENCE_HISTORICAL_COUNTS = 'FETCH_COLLECTION_SOURCE_SENTENCE_HISTORICAL_COUNTS';
export const SET_COLLECTION_SOURCE_HISTORY_TIME_PERIOD = 'SET_COLLECTION_SOURCE_HISTORY_TIME_PERIOD';
export const FETCH_SIMILAR_COLLECTIONS = 'FETCH_SIMILAR_COLLECTIONS';
export const FETCH_COLLECTION_LIST = 'FETCH_COLLECTION_LIST';
export const FETCH_COLLECTION_DETAILS = 'FETCH_COLLECTION_DETAILS';
export const SELECT_COLLECTION = 'SELECT_COLLECTION';
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';
export const FETCH_COLLECTION_TO_COPY = 'FETCH_COLLECTION_TO_COPY';
export const CREATE_NEW_COLLECTION = 'CREATE_NEW_COLLECTION';
export const SET_FAVORITE_COLLECTION = 'SET_FAVORITE_COLLECTION';
export const FETCH_COLLECTION_SOURCES_BY_IDS = 'FETCH_COLLECTION_SOURCES_BY_IDS';
export const RESET_COLLECTIONS_BY_IDS = 'RESET_COLLECTIONS_BY_IDS';
export const UPLOAD_SOURCE_LIST_FROM_TEMPLATE = 'UPLOAD_SOURCE_LIST_FROM_TEMPLATE';
export const CREATE_SOURCES_FROM_URLS = 'CREATE_SOURCES_FROM_URLS';

export const fetchCollectionSourcesByIds = createAsyncAction(FETCH_COLLECTION_SOURCES_BY_IDS, api.collectionsByIds, props => props);

export const resetCollectionsByIds = createAction(RESET_COLLECTIONS_BY_IDS);

export const favoriteCollection = createAsyncAction(SET_FAVORITE_COLLECTION, api.favoriteCollection);

export const selectCollection = createAction(SELECT_COLLECTION, id => id);

export const fetchCollectionList = createAsyncAction(FETCH_COLLECTION_LIST, api.collectionList, id => id);

export const fetchCollectionDetails = createAsyncAction(FETCH_COLLECTION_DETAILS, api.collectionDetails, id => id);

export const fetchCollectionToCopy = createAsyncAction(FETCH_COLLECTION_TO_COPY, api.collectionDetails, id => id);

export const fetchCollectionSentenceCount = createAsyncAction(FETCH_COLLECTION_SENTENCE_COUNT, api.collectionSentenceCount, id => id);

export const fetchCollectionTopWords = createAsyncAction(FETCH_COLLECTION_TOP_WORDS, api.collectionWordCount, id => id);

export const fetchCollectionGeo = createAsyncAction(FETCH_COLLECTION_GEO, api.collectionGeography, id => id);

export const fetchCollectionSourceSentenceCounts = createAsyncAction(FETCH_COLLECTION_SOURCE_SENTENCE_COUNTS, api.collectionSourceSentenceCounts, id => id);

export const fetchCollectionSourceSentenceHistoricalCounts = createAsyncAction(FETCH_COLLECTION_SOURCE_SENTENCE_HISTORICAL_COUNTS, api.collectionSourceSentenceHistoricalCounts, id => id);

export const setCollectionSourceHistoryTimePeriod = createAction(SET_COLLECTION_SOURCE_HISTORY_TIME_PERIOD, timePeriod => timePeriod);

export const createCollection = createAsyncAction(CREATE_NEW_COLLECTION, api.createCollection, props => props);

export const updateCollection = createAsyncAction(UPDATE_COLLECTION, api.updateCollection, props => props);

export const fetchSimilarCollections = createAsyncAction(FETCH_SIMILAR_COLLECTIONS, api.similarCollections, id => id);

export const fetchFeaturedCollectionList = createAsyncAction(FETCH_FEATURED_COLLECTIONS_LIST, api.featuredCollectionList);

export const fetchPopularCollectionList = createAsyncAction(FETCH_POPULAR_COLLECTIONS_LIST, api.popularCollectionList);

export const uploadSourceListFromTemplate = createAsyncAction(UPLOAD_SOURCE_LIST_FROM_TEMPLATE, api.collectionUploadSourceListFromTemplate, props => props);

export const createSourcesByUrl = createAsyncAction(CREATE_SOURCES_FROM_URLS, api.createSourcesByUrl, urls => urls);
