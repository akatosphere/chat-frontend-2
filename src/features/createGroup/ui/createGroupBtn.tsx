import Link from "next/link";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import CreateGroup from "@/shared/ui/icons/createGroup.svg";

type CreateGroupBtnProps = {
  className?: string;
};

export const CreateGroupBtn: React.FC<CreateGroupBtnProps> = ({ className }) => {
  return (
    <Button asChild variant="ghost" size="icon-auto" className={cn(className)}>
      <Link href="/create-group">
        <CreateGroup className="h-11 w-11" />
      </Link>
    </Button>
  );
};
