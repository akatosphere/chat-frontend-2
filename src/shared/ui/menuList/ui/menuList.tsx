"use client";
import { cn } from "@/shared/shadcn/lib/utils";

import { MenuItem } from "../model/types";
import { MenuListItem } from "./menuListItem";

type MenuListProps = {
  className?: string;
  isDestructive?: boolean;
  items: MenuItem[];
};

export const MenuList: React.FC<MenuListProps> = ({ className, items, isDestructive }) => {
  return (
    <ul
      className={cn(
        "flex w-full flex-col rounded-lg bg-white",
        isDestructive && "text-error bg-transparent",
        className,
      )}
    >
      {items.map((item, index) => {
        return <MenuListItem key={index} item={item} className="last:border-0" />;
      })}
    </ul>
  );
};
