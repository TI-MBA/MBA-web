import axios from "axios";

const api = axios.create({
  baseURL: "https://mba-api.herokuapp.com/api",
});

export default api;
