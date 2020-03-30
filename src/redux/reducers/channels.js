import { FETCH_CHANNELS, ADD_CHANNEL } from "../actions/actionTypes";

const initialState = {
  channels: [],
  openedChannel: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const allChannels = payload;
      return {
        ...state,
        channels: allChannels
      };
    case ADD_CHANNEL:
      return {
        ...state,
        channels: [payload, ...state.channels]
      };
    default:
      return state;
  }
};
export default reducer;
