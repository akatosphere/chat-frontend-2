// src/lib/useLogout.ts
import api from "./apiClient";
import { useAuthStore } from "./store";

export const logout = () => {
  const store = useAuthStore.getState();

  store.clearAccessToken();

  delete api.defaults.headers.common["Authorization"];

  document.cookie = "is_authenticated=false; path=/";
  document.cookie = "is_filled=false; path=/";
  document.cookie = "phone=; Max-Age=0; path=/";
};
