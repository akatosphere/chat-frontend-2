// src/lib/useLogout.ts
import api from "./apiClient";
import { useAuthStore } from "./store";

export const logout = async () => {
  const store = useAuthStore.getState();

  // чистим access token
  store.clearAccessToken();
  delete api.defaults.headers.common["Authorization"];

  // чистим client-side куки
  document.cookie = "is_authenticated=false; path=/";
  document.cookie = "is_filled=false; path=/";
  document.cookie = "phone=; Max-Age=0; path=/";

  try {
    // серверный логаут для httpOnly refresh token
    await fetch("/api/logout", { method: "POST", credentials: "include" });
  } catch {
    // игнорируем ошибки
  }
};
