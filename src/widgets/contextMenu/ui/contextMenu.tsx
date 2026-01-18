import { cn } from "@/shared/shadcn/lib/utils";

import { MenuItem } from "./contextMenuProvider";

type ContextMenuProps = {
  items: MenuItem[];
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export const ContextMenu = ({ items, onClose, className, style }: ContextMenuProps) => {
  return (
    <div
      className={cn(
        "max-w-[250px] min-w-[250px] overflow-hidden rounded-md bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.2)]",
        className,
      )}
      style={style}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            item.onClick();
            onClose?.();
          }}
          className={cn(
            "space-x-full subtext border-light-gray flex w-full cursor-pointer items-center justify-between gap-1.5 border-b px-4 py-2.5 text-left transition-colors last:border-0 hover:bg-gray-100",
            item.destructive ? "text-error" : "text-black",
          )}
        >
          <span>{item.label}</span>
          {item.icon && (
            <item.icon
              className={cn(
                "text-gray h-min max-h-5 min-h-5 w-min max-w-5 min-w-5",
                item.destructive && "text-error",
              )}
            />
          )}
        </button>
      ))}
    </div>
  );
};
