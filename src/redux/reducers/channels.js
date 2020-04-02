import {
  FETCH_CHANNELS,
  ADD_CHANNEL,
  FETCH_CHANNEL,
  SEND_MESSAGE,
  FILTER_CHANNELS,
  CLEAR_MESSAGES
} from "../actions/actionTypes";

const initialState = {
  channels: [],
  openedChannel: [],
  filteredChannels: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const allChannels = payload;
      return {
        ...state,
        channels: allChannels,
        filteredChannels: allChannels
      };
    case ADD_CHANNEL:
      return {
        ...state,
        channels: [payload, ...state.channels]
      };
    case FETCH_CHANNEL:
      return {
        ...state,
        openedChannel: [...state.openedChannel, ...payload]
      };
    case SEND_MESSAGE:
      return {
        ...state,
        openedChannel: [...state.openedChannel, payload]
      };
    /**
     * 😭😭😭
     * Move filtering to component state. It shouldn't be in redux.
     */
    case FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`
            .toLowerCase()
            .includes(payload.toLowerCase());
        })
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        openedChannel: []
      };
    default:
      return state;
  }
};
export default reducer;
