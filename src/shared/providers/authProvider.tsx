"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "../api/store";

// Список публичных путей (ваша исходная логика)
const PUBLIC_ROUTES = [
  "/auth",
  "/auth/phone",
  "/auth/code",
  "/auth/support",
  "/auth/support/success",
];

interface AuthProviderProps {
  children: React.ReactNode;
  initialToken: string | null;
}

export const AuthProvider = ({ children, initialToken }: AuthProviderProps) => {
  const pathname = usePathname();
  // Берем только нужные функции (не берем всё состояние, чтобы не было лишних ререндеров)
  const syncToken = useAuthStore((s) => s.syncToken);
  const finishInitialization = useAuthStore((s) => s.finishInitialization);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    // 1. Синхронизируем токен, полученный от SSR
    if (initialToken) {
      syncToken(initialToken);
    }

    const isPublicRoute = pathname ? PUBLIC_ROUTES.includes(pathname) : false;

    if (isPublicRoute) {
      finishInitialization();
      return;
    }

    // 2. Если токена нет, пробуем рефреш
    const initAuth = async () => {
      if (!initialToken) {
        try {
          const res = await fetch("/api/refresh-token", {
            method: "POST",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            // Здесь используем syncToken, так как сервер уже сам обновит куки
            // при запросе к /api/refresh-token (если вы так настроили)
            syncToken(data.access);
          }
        } catch (e) {
          console.error(e);
        }
      }
      finishInitialization();
    };

    initAuth();
  }, [initialToken, pathname, syncToken, finishInitialization]);

  const isPublicRoute = pathname ? PUBLIC_ROUTES.includes(pathname) : false;

  // Если мы еще не готовы, показываем ничего или лоадер
  // НО: если у нас есть initialToken, мы можем разрешить рендер сразу!
  if (!isInitialized && !initialToken && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
};
