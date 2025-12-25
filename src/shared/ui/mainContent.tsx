import { cn } from "@/shared/shadcn/lib/utils";

type MainContentProps = {
  className?: string;
  children?: React.ReactNode;
};

export const MainContent: React.FC<MainContentProps> = ({ className, children }) => {
  return (
    <div className={cn("bg-main-gray h-full w-full overflow-hidden rounded-md", className)}>
      {children}
    </div>
  );
};
