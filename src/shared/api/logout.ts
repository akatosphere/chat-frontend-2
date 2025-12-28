// src/lib/logout.ts
import api from "./apiClient";
import { useAuthStore } from "./store";

export const logout = () => {
  // 1. Очистка access token из памяти
  useAuthStore.getState().clearAccessToken();

  // 2. Очистка Authorization header в axios
  delete api.defaults.headers.common["Authorization"];

  // 3. Ставим флаг is_authenticated для middleware
  document.cookie = "is_authenticated=false; path=/";
  window.location.href = "/auth";
};
