import axios from "axios";
import { getValidToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT를 Authorization 헤더에 자동으로 포함
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getValidToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error: unknown) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
