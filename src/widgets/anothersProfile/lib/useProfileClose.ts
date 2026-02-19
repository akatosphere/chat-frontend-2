"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { useAnothersProfileUIStore } from "../model/anothersProfileUIStore";

/**
 * Хук для безопасного закрытия профиля.
 * Использует явный редирект вместо router.back() для избежания проблем
 * с пустой историей браузера после рефреша страницы.
 */
export const useProfileClose = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isMainActive, toggleIsMainActive } = useAnothersProfileUIStore(
    useShallow((s) => ({
      isMainActive: s.isMainActive,
      toggleIsMainActive: s.toggleIsMainActive,
    })),
  );

  const closeProfile = useCallback(() => {
    if (!pathname) {
      router.back();
      return;
    }

    if (isMainActive) {
      // Парсим pathname: /chats/{chatKey}/profile -> /chats/{chatKey}
      const pathParts = pathname.split("/").filter(Boolean);

      if (pathParts[0] === "chats" && pathParts.length === 3 && pathParts[2] === "profile") {
        const chatKey = pathParts[1];
        router.push(`/chats/${chatKey}`);
      } else {
        // Fallback на router.back() если pathname не соответствует ожидаемому формату
        router.back();
      }
    } else {
      toggleIsMainActive();
    }
  }, [pathname, router, isMainActive, toggleIsMainActive]);

  return closeProfile;
};
