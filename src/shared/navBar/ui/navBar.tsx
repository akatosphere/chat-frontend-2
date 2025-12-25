"use client";

import { usePathname } from "next/navigation";

import { navItems } from "../models/navItems";
import { NavItem } from "./navItem";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-gray text-gray fixed bottom-0 left-0 w-full border-t md:static md:flex md:flex-col md:gap-2">
      <div className="mx-4 flex h-[83px] justify-between py-2 text-sm md:hidden md:h-[228px] md:w-12 md:flex-col md:items-center md:gap-2">
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
              isActive={pathname === item.href}
            />
          ))}
      </div>

      <div className="hidden h-[83px] justify-between text-sm md:flex md:h-[228px] md:w-12 md:flex-col md:items-center md:gap-2">
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
              isActive={pathname === item.href}
            />
          ))}
      </div>
    </nav>
  );
};
