import { combineReducers } from 'redux';
import { SELECT_SOURCE } from '../../../actions/sourceActions';
import snapshots from './snapshots';
import timespans from './timespans';
import details from './details/details';
import filters from './filters';
import info from './info';

const INITIAL_STATE = null;

function id(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_SOURCE:
      return parseInt(action.payload.id, 10);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  id,
  info,
  details,
  snapshots,
  timespans,
  filters,
});

export default rootReducer;