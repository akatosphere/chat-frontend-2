import { cn } from "@/shared/shadcn/lib/utils";

type SidebarProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "desktop:min-w-[360px] desktop:max-w-[360px] bg-main-light-gray desktop:rounded-md desktop:order-2 desktop:border desktop:border-muted flex flex-1 flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
};
