// src/lib/logout.ts
import api from "./apiClient";
import { useAuthStore } from "./store";

export const logout = () => {
  // 1. Очистка access token из памяти
  useAuthStore.getState().clearAccessToken();

  // 2. Очистка Authorization header в axios
  delete api.defaults.headers.common["Authorization"];

  // 3. Ставим флаг logged_out для middleware
  document.cookie = "logged_out=true; path=/";
  window.location.href = "/auth";
};
