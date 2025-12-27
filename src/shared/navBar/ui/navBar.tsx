"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/shared/shadcn/lib/utils";

import { navItems } from "../models/navItems";
import { NavItem } from "./navItem";

type NavBarProps = {
  className?: string;
};

export const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const pathname = usePathname();

  const isChatPage = pathname?.startsWith("/chats/");

  return (
    <nav
      className={cn(
        "border-gray text-gray desktop:w-auto desktop:border-t-0 desktop:static desktop:flex desktop:flex-col desktop:gap-2 w-full border-t",
        isChatPage && "desktop:flex hidden",
        className,
      )}
    >
      <div className="desktop:hidden desktop:h-[228px] desktop:w-12 desktop:flex-col desktop:items-center desktop:gap-2 mx-4 flex h-[83px] justify-between py-2 text-sm">
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
              isActive={pathname?.startsWith(item.href)}
            />
          ))}
      </div>

      <div className="desktop:flex desktop:h-[228px] desktop:w-12 desktop:flex-col desktop:items-center desktop:gap-2 hidden h-[83px] justify-between text-sm">
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
              isActive={pathname?.startsWith(item.href)}
            />
          ))}
      </div>
    </nav>
  );
};
