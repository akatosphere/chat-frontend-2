"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "./navItem";
import { useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { navItems } from "../models/navItems";

export const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  // SSR-safe определение mobile
  const isMobile = useMediaQuery("(max-width: 767px)");

  const sortedItems = [...navItems].sort((a, b) =>
  isMobile
    ? a.order.mobile - b.order.mobile
    : a.order.desktop - b.order.desktop
);

  return (
    <nav className={isMobile ? "fixed bottom-0 left-0 w-full border-t border-gray text-gray" : "flex flex-col gap-2"}>
      <div
        className={
          isMobile
            ? "flex justify-between mx-4 py-2 h-[83px] text-sm"
            : "flex flex-col justify-between items-center gap-2 w-12 h-[228px]"
        }
      >
        {sortedItems.map((item) => {
          const isActive = item.href 
            ? pathname === item.href 
            : activeLabel === item.label;

          return (
            <NavItem
              key={item.label}
              label={item.label}
              iconDesktop={item.IconDesktop}
              iconMobile={item.IconMobile}
              isMobile={isMobile}
              isActive={isActive}
              href={item.href}
              onClick={() => {
                if (!item.href) setActiveLabel(item.label);
                if (item.href) router.push(item.href);
              }}
            />
          );
        })}
      </div>
    </nav>
  );
};

