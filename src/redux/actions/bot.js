import axios from "axios";
import { botinstance } from "./instance";
import { ACTIVATE_AZIZ, DEACTIVATE_AZIZ } from "./actionTypes";

export const azizLogin = () => {
  const azizData = { username: "azizbot", password: "azizbot1234" };
  return async dispatch => {
    try {
      const res = await botinstance.post("login/", azizData);
      botinstance.defaults.headers.common.Authorization = `jwt ${res.data.token}`;
    } catch (err) {
      console.log(err);
    }
  };
};

export const azizLogout = () => {
  delete botinstance.defaults.headers.common.Authorization;
};

export const activateAziz = () => {
  return {
    type: ACTIVATE_AZIZ
  };
};
export const deactivateAziz = () => {
  return {
    type: DEACTIVATE_AZIZ
  };
};

export const aziztalks = (msg, channelID) => {
  let text = "";
  switch (msg) {
    case (msg = "food"):
      text = "https://media.giphy.com/media/xTk9ZDxBnbfAtVotIQ/giphy.gif";
      break;
    case "dance":
      text = "https://media.giphy.com/media/xWazTCAcI7m2A/giphy.gif";
      break;
    case "coding":
      text = "https://media.giphy.com/media/YFkpsHWCsNUUo/giphy.gif";
      break;
    case "clear interval":
      text = "https://media.giphy.com/media/JGunlb6LbQlz2/giphy.gif";
      break;
    case "JS":
      text = "https://media.giphy.com/media/l2JhrYYxAD6N5gble/giphy.gif";
      break;
    default:
      text =
        "Hello I'm Aziz, you can send me one of the array elements [food,dance,coding,clear interval,JS] and i will send you a GIF as my response";
  }
  return async dispatch => {
    try {
      const message = {
        username: "AzizBot",
        message: text,
        timestamp: new Date(),
        channel: channelID
      };
      const res = await botinstance.post(
        `/channels/${channelID}/send/`,
        message
      );
      dispatch({
        type: ACTIVATE_AZIZ
      });
    } catch (error) {
      console.log(error);
    }
  };
};
