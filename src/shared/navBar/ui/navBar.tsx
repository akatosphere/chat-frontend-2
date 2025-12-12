// src/shared/navBar/ui/navBar.tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "./navItem";
import { navItems } from "../utils/navItems";
import { useIsMobile } from "../utils/useIsMobile";
import { useState } from "react";

export const NavBar = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  // Для кнопок без href можно хранить локальное активное состояние
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  return (
    <nav
      className={
        isMobile
          ? "fixed bottom-0 left-0 w-full border-t border-gray text-gray"
          : "flex flex-col gap-2"
      }
    >
      <div
        className={
          isMobile
            ? "flex justify-between mx-4 py-2 h-[83px] text-sm"
            : "flex flex-col justify-between items-center gap-2 w-12 h-[228px] ml-3"
        }
      >
        {navItems.map((item) => {
          const isActive = item.href ? pathname === item.href : activeLabel === item.label;

          return (
            <NavItem
              key={item.label}
              label={item.label}
              iconDesktop={item.IconDesktop}
              iconMobile={item.IconMobile}
              variant={isMobile ? "mobile" : "desktop"}
              isActive={isActive}
              href={item.href}
              onClick={() => {
                if (!item.href) setActiveLabel(item.label); // для кнопок без href
                if (item.href) router.push(item.href); // имитация перехода
              }}
            />
          );
        })}
      </div>
    </nav>
  );
};
