import { cn } from "@/shared/shadcn/lib/utils";

type SidebarProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "desktop:min-w-[360px] desktop:max-w-[360px] bg-main-gray flex flex-1 flex-col rounded-md",
        className,
      )}
    >
      {children}
    </div>
  );
};
