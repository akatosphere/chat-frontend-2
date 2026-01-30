import { cn } from "@/shared/shadcn/lib/utils";

type DefaultProps = {
  className?: string;
};

export const Default: React.FC<DefaultProps> = ({ className }) => {
  return <div className={cn("", className)}>ниче нету</div>;
};
