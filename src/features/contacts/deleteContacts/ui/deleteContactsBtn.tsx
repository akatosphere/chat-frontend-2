import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type DeleteContactsBtnProps = {
  className?: string;
};

export const DeleteContactsBtn: React.FC<DeleteContactsBtnProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <Button className="text-error text" variant="text" size="inline">
        Удалить контакты
      </Button>
    </div>
  );
};
