import { FETCH_MEDIAPICKER_SOURCE_SEARCH, MEDIA_PICKER_TOGGLE_MEDIA_IN_LIST, RESET_MEDIAPICKER_SOURCE_SEARCH } from '../../../actions/systemActions';
import { createAsyncReducer } from '../../../lib/reduxHelpers';

const sourceQueryResults = createAsyncReducer({
  initialState: {
    args: { type: 1, mediaKeyword: null },
    list: [],
  },
  action: FETCH_MEDIAPICKER_SOURCE_SEARCH,
  handleSuccess: (payload, state, meta) => ({
    args: Object.assign({}, meta.args[0], { selected: false }),
    list: payload.list.map(c => ({
      ...c,
      name: `${c.name}`,
      id: parseInt(c.media_id, 10),
      type: 'source',
      selected: false,
    })),
  }),
  [MEDIA_PICKER_TOGGLE_MEDIA_IN_LIST]: (payload, state) => ({
    list: state.list.map((c) => {
      if (c.id === payload.selectedMedia.id) {
        return ({
          ...c,
          selected: payload.setSelected,
        });
      }
      return c;
    }),
  }),
  [RESET_MEDIAPICKER_SOURCE_SEARCH]: () => ({ args: { type: 1, mediaKeyword: null }, list: [] }),
});

export default sourceQueryResults;
