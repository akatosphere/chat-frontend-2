"use client";
import { usePathname } from "next/navigation";

import { cn } from "../shadcn/lib/utils";
import { MainContent } from "../ui/mainContent";
import { Sidebar } from "../ui/sidebar";

type ResponsiveLayoutProps = {
  children: React.ReactNode; // Центральная область (Main)
  sidebar: React.ReactNode; // Левая область
  extra: React.ReactNode; // Правая область (опционально)
};

export const ResponsiveLayout = ({ children, sidebar, extra }: ResponsiveLayoutProps) => {
  const pathname = usePathname() ?? "";
  const pathParts = pathname.split("/").filter(Boolean);

  // 1. Условие для области EXTRA (Профиль в чате)
  // Маршрут: /chats/{id}/profile
  const isExtraActive = pathParts[0] === "chats" && pathParts.length === 3;

  // 2. Условие для области MAIN (Сам чат)
  // Маршрут: /chats/{id} или /chats/{uid}
  const isMainActive = pathParts[0] === "chats" && pathParts.length === 2;

  // 3. Условие для области SIDEBAR (Списки, настройки, создание групп)
  // Все остальные маршруты: /chats, /settings, /settings/profile, /contacts и т.д.
  const isSidebarActive = !isExtraActive && !isMainActive;

  return (
    <>
      <Sidebar
        className={cn(
          "desktop:flex",
          // На мобилке: показываем только если не активен чат и не активен профиль
          isSidebarActive ? "flex" : "hidden",
        )}
      >
        {sidebar}
      </Sidebar>
      <MainContent
        className={cn(
          "desktop:flex",
          // На мобилке: показываем только если активен именно чат
          isMainActive ? "flex" : "hidden",
        )}
      >
        {children}
      </MainContent>
      {/* EXTRA: Правая колонка (Профиль/Инфо) */}
      <Sidebar
        className={cn(
          isExtraActive ? "flex" : "hidden", // Покажется на мобилке (так как isSidebarActive и isMainActive будут false)
        )}
      >
        {extra}
      </Sidebar>
    </>
  );
};
