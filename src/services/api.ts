import axios from "axios";
import { getToken } from "../utils/auth";
import { logout } from "./auth.client";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
},
(error) => {
  return Promise.reject(error);
}
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();

      // hard redirect (outside React)
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
