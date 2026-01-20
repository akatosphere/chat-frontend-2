import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type SubmitBtnProps = {
  className?: string;
};

export const SubmitBtn: React.FC<SubmitBtnProps> = ({ className }) => {
  return <Button className={cn("", className)}>Создать</Button>;
};
