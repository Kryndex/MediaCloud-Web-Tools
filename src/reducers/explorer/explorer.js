import { combineReducers } from 'redux';
import selected from './selected';
import queries from './queries/queriesHandler';
import lastSearchTime from './lastSearchTime';
import sentenceCount from './sentenceCount';
import topWords from './topWords';
import samples from './samples';
import stories from './stories';
import storyCount from './storyCount';
import geo from './geo';

const rootReducer = combineReducers({
  selected,
  queries,
  lastSearchTime,
  sentenceCount,
  topWords,
  samples,
  stories,
  storyCount,
  geo,
});

export default rootReducer;
