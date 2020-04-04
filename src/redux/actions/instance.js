import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const botinstance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});
