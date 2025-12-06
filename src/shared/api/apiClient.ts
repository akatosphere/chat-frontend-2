import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

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

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers ??= new AxiosHeaders();
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomConfig;

    if (!config || error.response?.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    config._retry = true;

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
      const res = await fetch("/api/refresh-token", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Refresh failed");

      const data = await res.json();
      const newAccess = data.access;

      localStorage.setItem("access_token", newAccess);
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
      processQueue(null, newAccess);

      config.headers?.set("Authorization", `Bearer ${newAccess}`);
      return api(config);
    } catch (err) {
      processQueue(err as Error, null);
      localStorage.removeItem("access_token");
      window.location.href = "/auth";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
      failedQueue = [];
    }
  }
);

export default api;
