"use client";
import { cn } from "@/shared/shadcn/lib/utils";

import { MenuAction, MenuIcon, MenuItem } from "../model/types";
import { MenuListItem } from "./menuListItem";

type MenuListProps = {
  className?: string;
  items: MenuItem[];
  icons: MenuIcon;
  onAction?: (action: MenuAction) => void;
};

export const MenuList: React.FC<MenuListProps> = ({ className, items, onAction, icons }) => {
  console.log(icons);
  return (
    <ul className={cn("flex w-full flex-col rounded-lg bg-white", className)}>
      {items.map((item, index) => {
        return (
          <MenuListItem
            key={index}
            icons={icons}
            item={item}
            onAction={onAction}
            className="last:border-0"
          />
        );
      })}
    </ul>
  );
};
