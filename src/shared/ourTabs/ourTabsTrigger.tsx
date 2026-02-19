import { cn } from "@/shared/shadcn/lib/utils";

import { TabsTrigger } from "../shadcn/ui/tabs";

type OurTabsTriggerProps = {
  className?: string;
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const OurTabsTrigger: React.FC<OurTabsTriggerProps> = ({
  className,
  value,
  children,
  onClick,
}) => {
  return (
    <TabsTrigger
      value={value}
      className={cn("transform-[rotateX(180deg)] cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </TabsTrigger>
  );
};
