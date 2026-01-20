import { cn } from "@/shared/shadcn/lib/utils";

type Step2WidgetProps = {
  className?: string;
};

export const Step2Widget: React.FC<Step2WidgetProps> = ({ className }) => {
  return <div className={cn("", className)}>второй шаг</div>;
};
