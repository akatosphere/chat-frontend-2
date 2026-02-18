import { cn } from "@/shared/shadcn/lib/utils";

import { TabsList } from "../shadcn/ui/tabs";

type OurTabsListProps = {
  className?: string;
  children: React.ReactNode;
};

export const OurTabsList: React.FC<OurTabsListProps> = ({ className, children }) => {
  return (
    <TabsList
      variant="line"
      className={cn(
        "border-light-gray scrollbar-hover w-full transform-[rotateX(180deg)] flex-nowrap overflow-x-auto overflow-y-hidden border-t pt-0",
        className,
      )}
    >
      {children}
    </TabsList>
  );
};
