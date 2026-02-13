import { useCreateChatContextMenu } from "@/features/createChat/lib/useCreateChatContextMenu";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import CreateBtn from "@/shared/ui/icons/createChat/createBtn.svg";

type CreateChatBtnProps = {
  className?: string;
};

export const CreateChatBtn: React.FC<CreateChatBtnProps> = ({ className }) => {
  const { onContextMenu } = useCreateChatContextMenu();
  return (
    <Button variant="ghost" size="icon-auto" className={cn(className)} onClick={onContextMenu}>
      <CreateBtn className="text-primary h-6 w-6" />
    </Button>
  );
};
