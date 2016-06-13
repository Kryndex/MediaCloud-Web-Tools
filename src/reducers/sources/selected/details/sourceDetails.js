import { resolve, reject } from 'redux-simple-promise';
import { FETCH_SOURCE_DETAILS } from '../../../../actions/sourceActions';
// import { FETCH_SOURCE_TAG_DETAILS, SORT_SOURCE_TAG_DETAILS } from '../../../../actions/sourceActions';

import * as fetchConstants from '../../../../lib/fetchConstants.js';

const INITIAL_STATE = {
  fetchStatus: fetchConstants.FETCH_INVALID,
  list: {},
};

// TODO: replace this with normalizr? https://github.com/gaearon/normalizr
function arrayToDict(arr, keyPropertyName) {
  const dict = {};
  arr.forEach((item) => {
    dict[item[keyPropertyName]] = item;
  });
  return dict;
}

function sourceDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SOURCE_DETAILS:
      return Object.assign({}, state, {
        fetchStatus: fetchConstants.FETCH_ONGOING,
        list: {},
      });
    case resolve(FETCH_SOURCE_DETAILS):
      return Object.assign({}, state, {
        fetchStatus: fetchConstants.FETCH_SUCCEEDED,
        list: action.payload.results,
      });
    case reject(FETCH_SOURCE_DETAILS):
      return Object.assign({}, state, {
        fetchStatus: fetchConstants.FETCH_FAILED,
        list: {},
      });

    /* case SORT_SOURCE_TAG_DETAILS:
      return Object.assign({}, state, {
        ...state,
        sort: action.payload.sort,
      }); */
    default:
      return state;
  }
}

export default sourceDetails;