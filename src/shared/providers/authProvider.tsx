"use client";

import { useEffect, useRef } from "react";

import { useAuthStore } from "../api/store";

interface AuthProviderProps {
  children: React.ReactNode;
  initialToken: string | null;
}

export const AuthProvider = ({ children, initialToken }: AuthProviderProps) => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const finishInitialization = useAuthStore((s) => s.finishInitialization);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initAuth = async () => {
      if (initialToken) {
        // Устанавливаем токен из SSR
        setAccessToken(initialToken);
      } else {
        // Если Middleware почему-то не смог обновить токен (или его вообще нет),
        // можно попробовать последний шанс на клиенте
        try {
          const res = await fetch("/api/refresh-token", {
            method: "POST",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            setAccessToken(data.access);
          }
        } catch (e) {
          console.error("Client-side hydration refresh failed", e);
        }
      }

      finishInitialization();
    };

    initAuth();
  }, [initialToken, setAccessToken, finishInitialization]);
  if (!isInitialized) {
    if (!initialToken) return null;
  }

  return <>{children}</>;
};
