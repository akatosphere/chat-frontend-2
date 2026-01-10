import { cn } from "@/shared/shadcn/lib/utils";

type SidebarContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

export const SidebarContainer: React.FC<SidebarContainerProps> = ({ className, children }) => {
  return (
    <div
      className={cn("scrollbar-content flex w-full flex-1 flex-col overflow-y-auto p-4", className)}
    >
      {children}
    </div>
  );
};
