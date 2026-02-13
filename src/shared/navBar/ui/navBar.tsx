"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { cn } from "@/shared/shadcn/lib/utils";

import { useSidebarStore } from "../model/sidebarStore";
import { navItems } from "../models/navItems";
import { NavItem } from "./navItem";

type NavBarProps = {
  className?: string;
};

export const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const pathname = usePathname();
  const isMobile = useIsMobileStore((s) => s.isMobile);
  const activeSidebarSection = useSidebarStore((s) => s.activeSidebarSection);
  const setActiveSidebarSection = useSidebarStore((s) => s.setActiveSidebarSection);

  const isChatPage = pathname?.startsWith("/chats/");

  // Обновляем активный раздел sidebar при изменении pathname (только для основных разделов)
  useEffect(() => {
    if (!pathname) return;

    // Определяем, на каком основном разделе мы находимся
    if (pathname === "/chats" || pathname.startsWith("/chats/")) {
      // Если путь точно /chats (без id), это список чатов
      if (pathname === "/chats") {
        setActiveSidebarSection("/chats");
      }
      // Если /chats/{id}, не меняем активный раздел (сохраняем предыдущий)
    } else if (pathname.startsWith("/contacts")) {
      setActiveSidebarSection("/contacts");
    } else if (pathname.startsWith("/services")) {
      setActiveSidebarSection("/services");
    } else if (pathname.startsWith("/settings")) {
      setActiveSidebarSection("/settings");
    }
  }, [pathname, setActiveSidebarSection]);

  // Функция для определения активности элемента
  const isItemActive = (itemHref: string) => {
    // На мобилке используем pathname (текущая логика)
    if (isMobile) {
      return pathname?.startsWith(itemHref);
    }

    // На desktop используем activeSidebarSection
    return activeSidebarSection === itemHref;
  };

  return (
    <nav
      className={cn(
        "border-gray text-gray desktop:w-auto desktop:border-t-0 desktop:static desktop:flex desktop:flex-col desktop:gap-2 w-full border-t",
        isChatPage && "desktop:flex hidden",
        className,
      )}
    >
      <div className="desktop:hidden desktop:h-57 desktop:w-12 desktop:flex-col desktop:items-center desktop:gap-2 mx-4 flex h-20.75 justify-between py-2 text-sm">
        {navItems
          .slice()
          .sort((a, b) => a.order.mobile - b.order.mobile)
          .map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              href={item.href}
              iconDesktop={item.IconDesktop}
              iconMobile={item.IconMobile}
              order={item.order}
              isActive={isItemActive(item.href)}
            />
          ))}
      </div>

      <div className="desktop:flex desktop:h-57 desktop:w-12 desktop:flex-col desktop:items-center desktop:gap-2 hidden h-20.75 justify-between text-sm">
        {navItems
          .slice()
          .sort((a, b) => a.order.desktop - b.order.desktop)
          .map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              href={item.href}
              iconDesktop={item.IconDesktop}
              iconMobile={item.IconMobile}
              order={item.order}
              isActive={isItemActive(item.href)}
            />
          ))}
      </div>
    </nav>
  );
};
