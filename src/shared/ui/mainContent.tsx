import { cn } from "@/shared/shadcn/lib/utils";

type MainContentProps = {
  className?: string;
  children?: React.ReactNode;
};

export const MainContent: React.FC<MainContentProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "bg-main-light-gray desktop:rounded-md desktop:order-3 desktop:border desktop:border-muted h-full w-full overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};
