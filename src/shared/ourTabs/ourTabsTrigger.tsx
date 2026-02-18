import { cn } from "@/shared/shadcn/lib/utils";

import { TabsTrigger } from "../shadcn/ui/tabs";

type OurTabsTriggerProps = {
  className?: string;
  value: string;
  children: React.ReactNode;
};

export const OurTabsTrigger: React.FC<OurTabsTriggerProps> = ({ className, value, children }) => {
  return (
    <TabsTrigger value={value} className={cn("transform-[rotateX(180deg)]", className)}>
      {children}
    </TabsTrigger>
  );
};
