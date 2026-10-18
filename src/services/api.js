import axios from "axios";

const api = axios.create({
  // Set per build mode in .env.production / .env.development (or in the hosting provider's settings)
  baseURL: process.env.VUE_APP_API_URL,
});

export default api;
