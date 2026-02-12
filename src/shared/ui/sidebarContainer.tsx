import { cn } from "@/shared/shadcn/lib/utils";

type SidebarContainerProps = {
  className?: string;
  children?: React.ReactNode;
  scrollbar?: boolean;
};

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  className,
  children,
  scrollbar = true,
}) => {
  return (
    <div
      className={cn(
        scrollbar ? "scrollbar-content" : "scrollbar-hide",
        "flex w-full flex-1 flex-col overflow-y-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};
