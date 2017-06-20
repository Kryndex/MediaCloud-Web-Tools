import { combineReducers } from 'redux';
import selected from './selected';
import queries from './queries/queries';
import lastSearchTime from './lastSearchTime';
import sentenceCount from './sentenceCount';
import samples from './samples';
import stories from './stories';
import storyCount from './storyCount';
import geo from './geo';

const rootReducer = combineReducers({
  selected,
  queries,
  lastSearchTime,
  sentenceCount,
  samples,
  stories,
  storyCount,
  geo,
});

export default rootReducer;
