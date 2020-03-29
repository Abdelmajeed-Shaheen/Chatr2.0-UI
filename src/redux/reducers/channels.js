import { FETCH_CHANNELS } from "../actions/actionTypes";
const initialState = {
  channels: []
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const allChannels = payload;
      return {
        ...state,
        channels: allChannels
      };
    default:
      return state;
  }
};
export default reducer;
