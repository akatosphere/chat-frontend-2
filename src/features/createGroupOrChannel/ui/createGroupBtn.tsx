import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import CreateBtn from "@/shared/ui/icons/createGroupOrChannel/createBtn.svg";
import { useCreateGrOrChContextMenu } from "@/widgets/contextMenu/lib/useCreateGrOrChContextMenu";

type CreateGroupBtnProps = {
  className?: string;
};

export const CreateGroupBtn: React.FC<CreateGroupBtnProps> = ({ className }) => {
  const { onContextMenu } = useCreateGrOrChContextMenu();
  return (
    <Button variant="ghost" size="icon-auto" className={cn(className)} onClick={onContextMenu}>
      <CreateBtn className="text-primary h-6 w-6" />
    </Button>
  );
};
