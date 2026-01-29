"use client";

import { useDeleteSelectedContacts } from "@/entities/contact/lib/useDeleteSelectedContacts";
import { pluralize } from "@/shared/lib/pluralize";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { useSelectContactsStore } from "../../model/SelectContactsStore";

type DeleteContactsBtnProps = {
  className?: string;
};

export const DeleteContactsBtn: React.FC<DeleteContactsBtnProps> = ({ className }) => {
  const selected = useSelectContactsStore((s) => s.selected);
  const { mutate, isPending } = useDeleteSelectedContacts();

  if (selected.length === 0) return null;

  const text =
    "Удалить " +
    selected.length +
    pluralize(selected.length, " контакт", " контакта", " контактов");

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <Button
        className="text-error text desktop:hover:text-error desktop:hover:bg-primary-gray w-full"
        variant="text"
        size="md"
        disabled={isPending}
        onClick={() => mutate()}
      >
        {isPending ? "Удаление..." : text}
      </Button>
    </div>
  );
};
