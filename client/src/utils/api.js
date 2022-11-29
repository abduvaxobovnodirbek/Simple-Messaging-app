import axios from "axios";

export const API_URL = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
