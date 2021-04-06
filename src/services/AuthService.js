// src/services/AuthService.js

import axios from "axios";

const url = "http://localhost:5000/";

export default {
  login(credentials) {
    return axios
      .post(url + "login/", credentials)
      .then((response) => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + "signup/", credentials)
      .then((response) => response.data);
  },
  history(userName) {
    return axios
      .post(url + "history/", {
        params: {
          user: userName,
        },
      })
      .then((response) => response.data);
  },
  orderHistory(products, userName) {
    return axios
      .post(url + "orderhistory/", {
        params: {
          user: userName,
          orderProducts: products,
        },
      })
      .then((response) => response.data);
  },
};
