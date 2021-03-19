import axios from "axios";

const api = axios.create({
  baseURL: "http://desafioonline.webmotors.com.br:80/api/OnlineChallenge",
});

export default api;
