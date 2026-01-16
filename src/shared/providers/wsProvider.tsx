"use client";

import { useEffect, useRef } from "react";

import { useAuthStore } from "@/shared/api/store";
import { connectWS, disconnectWS, subscribeToWS } from "@/shared/api/wsClient";

import { useWSRequestStore } from "../model/wsRequest.store";

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  const prevTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToWS((data) => {
      // 1. Сначала проверяем, не является ли это ответом на конкретный запрос (по UID)
      if (data.request_uid) {
        useWSRequestStore.getState().fulfillRequest(data.request_uid, data);
      }

      // 2. Затем пробрасываем в роутеры
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // LOGIN или REFRESH TOKEN
    if (accessToken) {
      if (prevTokenRef.current !== accessToken) {
        connectWS(accessToken);
        prevTokenRef.current = accessToken;
      }
      return;
    }

    // LOGOUT
    if (!accessToken && prevTokenRef.current) {
      disconnectWS();
      prevTokenRef.current = null;
    }
  }, [accessToken, isInitialized]);

  return <>{children}</>;
};
