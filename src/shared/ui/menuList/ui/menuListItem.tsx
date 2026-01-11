import ArrowRight from "@icons/arrowRight.svg";
import Link from "next/link";

import { cn } from "@/shared/shadcn/lib/utils";

import { MenuAction, MenuIcon, MenuItem } from "../model/types";

type MenuListItemProps = {
  className?: string;
  item: MenuItem;
  icons: MenuIcon;
  onAction?: (action: MenuAction) => void;
};

export const MenuListItem: React.FC<MenuListItemProps> = ({ className, item, onAction, icons }) => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const ItemIcon = icons[item.icon];

  if ("action" in item)
    return (
      <li
        className={cn(
          "border-muted hover:bg-primary-accent-light w-full cursor-pointer overflow-hidden border-b transition-colors duration-200",
          className,
        )}
      >
        {!item.href && item.action && (
          <button
            className={cn(
              "desktop:py-3.5 flex w-full cursor-pointer items-center gap-2 px-2.5 py-6",
              item.isDestructive ? "text-error" : "text-black",
            )}
            onClick={() => onAction?.(item.action as MenuAction)}
          >
            <div className="flex h-5 w-5 items-center justify-center">
              <ItemIcon className="h-full w-full" />
            </div>
            {item.label}
          </button>
        )}
      </li>
    );

  return (
    <li className={cn("w-full cursor-pointer", className)}>
      {item.href && (
        <Link
          className="border-muted hover:bg-primary-accent-light desktop:py-3.5 flex items-center justify-between gap-2 overflow-hidden border-b px-2.5 py-6 transition-colors duration-200"
          href={item.href}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              item.isDestructive ? "text-error" : "text-black",
            )}
          >
            <div className="flex h-5 w-5 items-center justify-center">
              <ItemIcon className="h-full w-full" />
            </div>
            <span>{item.label}</span>
          </div>
          <ArrowRight className="text-gray h-4 w-4 justify-center-safe" />
        </Link>
      )}
    </li>
  );
};
