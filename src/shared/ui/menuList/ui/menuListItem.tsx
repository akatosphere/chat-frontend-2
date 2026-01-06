import ArrowRight from "@icons/arrowRight.svg";
import Link from "next/link";

import { cn } from "@/shared/shadcn/lib/utils";

import { ICONS } from "../lib/settingsData";
import { MenuItem } from "../model/types";

type MenuListItemProps = {
  className?: string;
  item: MenuItem;
  isDestructive?: boolean;
};

export const MenuListItem: React.FC<MenuListItemProps> = ({ className, item, isDestructive }) => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const ItemIcon = ICONS[item.icon];
  console.log(isDestructive);
  const handleClick = () => {
    if (item.action === "logout") {
      console.log("logout");
    }
  };
  if (item.action && !item.href)
    return (
      <li
        className={cn(
          "border-muted hover:bg-primary-accent-light w-full cursor-pointer overflow-hidden border-b transition-colors duration-200",
          className,
        )}
      >
        {!item.href && item.action && (
          <button className="flex items-center gap-2 px-2.5 py-3.5" onClick={handleClick}>
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
          className="border-muted hover:bg-primary-accent-light flex items-center justify-between gap-2 overflow-hidden border-b px-2.5 py-3.5 transition-colors duration-200"
          href={item.href}
        >
          <div className="flex items-center gap-3">
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
