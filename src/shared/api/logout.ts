import { useUserStore } from "@/entities/user/model/userStore";

import { getApiClient } from "./getApiClient";
import { useAuthStore } from "./store";
import { disconnectWS } from "./ws/wsClient";

export const logout = async () => {
  const store = useAuthStore.getState();

  if (!store.accessToken) {
    return;
  }

  // чистим access token
  store.clearAccessToken();
  useUserStore.getState().reset();
  delete getApiClient.defaults.headers.common["Authorization"];

  // чистим client-side куки
  document.cookie = "is_filled=false; path=/";
  document.cookie = "phone=; Max-Age=0; path=/";

  disconnectWS();

  try {
    // серверный логаут для httpOnly refresh token
    await fetch("/api/logout", { method: "POST", credentials: "include" });
  } catch {
    // игнорируем ошибки
  }
};
