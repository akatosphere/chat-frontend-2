// components/providers/auth-provider.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "../api/store";

// Список публичных путей, где рефреш не нужен
const PUBLIC_ROUTES = [
  "/auth",
  "/auth/phone",
  "/auth/code",
  "/auth/support",
  "/auth/support/success",
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isInitialized, finishInitialization, setAccessToken } = useAuthStore();

  useEffect(() => {
    // Проверяем, является ли текущий путь публичным
    const isPublicRoute = pathname ? PUBLIC_ROUTES.includes(pathname) : false;

    if (isPublicRoute) {
      finishInitialization(); // Просто помечаем готовым без запроса
      return;
    }

    const initAuth = async () => {
      try {
        const res = await fetch("/api/refresh-token", {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.access);
        }
      } finally {
        finishInitialization();
      }
    };

    initAuth();
  }, []);

  // Для публичных маршрутов мы можем рендерить детей сразу,
  // либо всё равно ждать флага, но он выставится мгновенно.
  if (!isInitialized) return null;

  return <>{children}</>;
};
