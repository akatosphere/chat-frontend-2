"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/shared/api/store";
import { connectWS, disconnectWS } from "@/shared/api/wsClient";

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    // Если приложение еще не определилось с авторизацией — ничего не делаем
    if (!isInitialized) return;

    if (accessToken) {
      // Подключаемся только при наличии токена
      connectWS(accessToken);
    } else {
      // Если токена нет (разлогинились) — отключаемся
      disconnectWS();
    }

    // Cleanup-функция: сработает при размонтировании провайдера (редко в layout)
    // или перед повторным запуском эффекта (например, при смене accessToken)
    return () => {
      disconnectWS();
    };
  }, [accessToken, isInitialized]);

  return <>{children}</>;
};
