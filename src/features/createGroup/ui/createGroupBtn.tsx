import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import CreateGroup from "@/shared/ui/icons/createGroup.svg";

import { createGroup } from "../api/ws";

type CreateGroupBtnProps = {
  className?: string;
};

export const CreateGroupBtn: React.FC<CreateGroupBtnProps> = ({ className }) => {
  return (
    <Button className={cn("", className)} variant="ghost" size="icon-auto" onClick={createGroup}>
      <CreateGroup className="h-11 w-11" />
    </Button>
  );
};
