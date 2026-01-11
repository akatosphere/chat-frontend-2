"use client";

import { useEffect, useRef } from "react";

import { useAuthStore } from "@/shared/api/store";
import { connectWS, disconnectWS } from "@/shared/api/wsClient";

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  const prevTokenRef = useRef<string | null>(null);

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
