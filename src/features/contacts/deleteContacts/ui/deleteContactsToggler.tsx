import Delete from "@icons/menu/delete.svg";

import { cn } from "@/shared/shadcn/lib/utils";
import { Toggle } from "@/shared/shadcn/ui/toggle";

import { useSelectContactsStore } from "../../model/SelectContactsStore";

type DeleteContactsTogglerProps = {
  className?: string;
};

export const DeleteContactsToggler: React.FC<DeleteContactsTogglerProps> = ({ className }) => {
  const { isSelecting, toggleIsSelecting } = useSelectContactsStore();
  return (
    <Toggle
      pressed={isSelecting}
      onPressedChange={toggleIsSelecting}
      className={cn("text-gray data-[state=on]:text-primary h-4 w-4 min-w-4 p-0", className)}
    >
      <Delete className="h-4 w-4" />
    </Toggle>
  );
};
