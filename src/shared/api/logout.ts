import { useUserStore } from "@/entities/chat/model/userStore";
import { useChatStore } from "@/features/chat/chat/model/store/useChatStore";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";

import { getApiClient } from "./getApiClient";
import { getQueryClient } from "./getQueryClient";
import { useAuthStore } from "./store";
import { disconnectWS } from "./ws/wsClient";

export const logout = async () => {
  const store = useAuthStore.getState();
  const chatListStore = useChatListStore.getState();
  const chatStore = useChatStore.getState();
  const queryClient = getQueryClient();

  if (!store.accessToken) {
    return;
  }

  queryClient.clear();
  // чистим access token
  store.clearAccessToken();
  useUserStore.getState().reset();
  chatListStore.reset();
  chatStore.reset();
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
