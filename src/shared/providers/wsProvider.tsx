"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/shared/api/store";
import { connectWS, disconnectWS } from "@/shared/api/wsClient";

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      connectWS(accessToken);
    } else {
      disconnectWS();
    }

    return () => {
      disconnectWS();
    };
  }, [isAuthenticated, accessToken]);

  return <>{children}</>;
};
