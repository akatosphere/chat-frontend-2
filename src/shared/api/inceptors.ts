import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import { redirect } from "next/navigation";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

interface PendingRequest {
  resolve: (response: AxiosResponse) => void;
  reject: (error: unknown) => void;
}

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // HttpOnly cookie летит автоматически
  timeout: 15_000,
});

const refreshClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10_000,
});

// флаг для блокировки повторных запросов и очередь отложенных запросов
let isRefreshing = false;
let failedQueue: PendingRequest[] = [];

// обработка очереди
const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      // подставляем новый токен и возвращаем готовый ответ
      const fakeResponse = {
        data: null,
        status: 200,
        statusText: "Refreshed",
        headers: {},
        config: {} as AxiosRequestConfig,
      } as AxiosResponse;

      prom.resolve(fakeResponse);
    }
  });

  failedQueue = [];
};

const handleLogout = () => {
  if (typeof window === "undefined") {
    // SSR
    redirect("/login");
  } else {
    // CSR
    window.location.href = "/login";
  }
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const config = error.config as AxiosRequestConfigWithRetry;

    // 401 + не повторяли, запускаем refresh
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      // уже идёт рефреш, становимся в очередь
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (response) => {
              // токен уже обновлён, просто повторяем запрос
              resolve(api(config));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        //  используем refreshClient БЕЗ интерсепторов
        const { data } = await refreshClient.post<{ access: string }>(
          "/api/v1/auth/login/refresh/token/",
          {} // refresh берётся из HttpOnly cookie
        );

        const newAccessToken = data.access;

        // обновляем глобальный заголовок для всех будущих запросов
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // разблокируем всех, кто ждал
        processQueue(null, newAccessToken);

        // Подставляем токен в текущий запрос
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // повторяем оригинальный запрос
        return api(config);
      } catch (refreshError) {
        processQueue(refreshError);
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // все остальные ошибки просто пробрасываем
    return Promise.reject(error);
  }
);

export default api;
