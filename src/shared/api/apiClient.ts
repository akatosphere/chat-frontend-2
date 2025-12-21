// lib/api.ts или src/lib/api.ts
import axios, { AxiosError, AxiosHeaders, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "./store";

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

// Request Interceptor — берём токен ТОЛЬКО из Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers ??= new AxiosHeaders();
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

// Response Interceptor — рефреш + очередь + обновление Zustand
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomConfig;

    if (!config || error.response?.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    config._retry = true;

    // Если уже идёт рефреш — ждём в очереди
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          config.headers?.set("Authorization", `Bearer ${token}`);
          return api(config);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const res = await fetch("http://localhost:3000/api/refresh-token", {
        method: "POST",
        credentials: "include", // важно для httpOnly куки
      });

      if (!res.ok) {
        throw new Error("Refresh failed");
      }

      const data = await res.json();
      const newAccessToken = data.access;

      if (!newAccessToken) {
        throw new Error("No access token in refresh response");
      }

      // КЛЮЧЕВОЙ МОМЕНТ: обновляем токен ТОЛЬКО через Zustand!
      useAuthStore.getState()._updateToken(newAccessToken);

      // Обновляем дефолтные заголовки (на всякий случай)
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

      // Разрешаем все запросы в очереди
      processQueue(null, newAccessToken);

      // Повторяем исходный запрос с новым токеном
      config.headers?.set("Authorization", `Bearer ${newAccessToken}`);
      return api(config);
    } catch (err) {
      // Полный логаут при любой ошибке рефреша
      useAuthStore.getState().logout();
      processQueue(err as Error, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
      failedQueue = [];
    }
  },
);

export default api;
