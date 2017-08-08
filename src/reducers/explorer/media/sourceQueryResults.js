import { FETCH_MEDIA_FOR_QUERY } from '../../../actions/explorerActions';
import { createAsyncReducer } from '../../../lib/reduxHelpers';

const sourceQueryResults = createAsyncReducer({
  action: FETCH_MEDIA_FOR_QUERY,
});
export default sourceQueryResults;

