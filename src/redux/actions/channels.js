import axios from "axios";
import {
  FETCH_CHANNELS,
  ADD_CHANNEL,
  SET_ERRORS,
  FETCH_CHANNEL,
  SEND_MESSAGE
} from "./actionTypes";

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

export const fetchChannel = channelID => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}`
      );
      const channel = res.data;
      dispatch({
        type: FETCH_CHANNEL,
        payload: channel
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sendMsg = (msg, channelID, user) => {
  return async dispatch => {
    try {
      const message = {
        username: user,
        message: msg,
        timestamp: new Date(),
        channel: channelID
      };
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        message
      );
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
