import axios from "axios";
import { FETCH_CHANNELS, ADD_CHANNEL, SET_ERRORS } from "./actionTypes";

import { setErrors } from "./errors";
export const fetchAllChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;

      dispatch({
        type: FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      dispatch(setErrors(error));
    }
  };
};

export const addChannel = (channel, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        channel
      );
      const newChannel = res.data;

      dispatch({
        type: ADD_CHANNEL,
        payload: newChannel
      });
      history.replace("/private");
    } catch (error) {
      dispatch({
        type: SET_ERRORS,
        payload: error
      });
    }
  };
};
