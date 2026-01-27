"use client";

import { useEffect, useRef } from "react";

import { useUserStore } from "@/entities/chat/model/userStore";
import { useAuthStore } from "@/shared/api/store";
import { connectWS, disconnectWS, subscribeToWS } from "@/shared/api/ws/wsClient";

import { useWSRequestStore } from "../api/ws/model/wsRequest.store";
import { dispatchWSEvent } from "../api/ws/wsHandlers";

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const setUserId = useUserStore((s) => s.setUserId);

  const prevTokenRef = useRef<string | null>(null);
  const userIdExtractedRef = useRef<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeToWS((data) => {
      // 1. Сначала проверяем, не является ли это ответом на конкретный запрос (по UID)
      // Это позволяет резолвить промисы, которые мы ждем в коде
      if (data.request_uid) {
        useWSRequestStore.getState().fulfillRequest(data.request_uid, data);
      }

      if (data.action === "new_status_user" && !userIdExtractedRef.current) {
        const statusData = data as { object: { user: { uid: string } } };
        if (statusData.object?.user?.uid) {
          setUserId(statusData.object.user.uid);
          userIdExtractedRef.current = true;
        }
      }
      // 2. Пробрасываем событие во все зарегистрированные доменные роутеры
      dispatchWSEvent(data);
    });

    return () => unsubscribe();
  }, [setUserId]);

  useEffect(() => {
    if (!isInitialized) return;

    // Сбрасываем флаг при смене токена
    if (accessToken && prevTokenRef.current !== accessToken) {
      userIdExtractedRef.current = false;
    }

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
      userIdExtractedRef.current = false;
    }
  }, [accessToken, isInitialized]);

  return <>{children}</>;
};
