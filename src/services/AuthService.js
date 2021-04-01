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
  getSecretContent() {
    return axios.get(url + "secret-route/").then((response) => response.data);
  },
  history(emailAdress) {
    return axios
      .post(url + "history/", {
        params: {
          userEmail: emailAdress,
        },
      })
      .then((response) => response.data);
  },
};
