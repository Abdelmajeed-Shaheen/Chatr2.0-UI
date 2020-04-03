import { combineReducers } from "redux";

// Reducers
import userReducer from "./user";
import errorReducer from "./errors";
import channelReducer from "./channels";
import botReducer from "./bot";

export default combineReducers({
  userState: userReducer,
  errorsState: errorReducer,
  channelsState: channelReducer,
  botState: botReducer
});
