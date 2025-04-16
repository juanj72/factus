// src/api/axiosInstance.ts
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "../../src/api/Factus/utils/auth";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_FACTUS, 
});

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  const body = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("client_id", import.meta.env.VITE_CLIENT_ID);
  body.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
  body.append("refresh_token", refresh);

  const response = await axios.post("/oauth/token", body.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { access_token, refresh_token } = response.data;
  saveTokens(access_token, refresh_token);
  return access_token;
};
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          onRefreshed(newToken);
        } catch {
          clearTokens();
          window.location.href = "/login";
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
