"use client";

import { pluralize } from "@/shared/lib/pluralize";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { useSelectContactsStore } from "../../model/SelectContactsStore";

type DeleteContactsBtnProps = {
  className?: string;
};

export const DeleteContactsBtn: React.FC<DeleteContactsBtnProps> = ({ className }) => {
  const selected = useSelectContactsStore((s) => s.selected);
  const setIsModalOpen = useSelectContactsStore((s) => s.setIsModalOpen);

  if (selected.length === 0) return null;

  const text =
    "Удалить " +
    selected.length +
    pluralize(selected.length, " контакт", " контакта", " контактов");

  return (
    <div
      className={cn(
        // Базовые стили, которые всегда применяются
        "flex w-full items-center justify-center p-4",
        // Стили для мобильных устройств
        "max-desktop:w-full max-desktop:border-gray max-desktop:absolute max-desktop:bottom-0 max-desktop:left-1/2 max-desktop:-translate-x-1/2 max-desktop:transform max-desktop:border-t max-desktop:bg-white max-desktop:pt-3",
        className,
      )}
    >
      <Button
        className="text-error text desktop:hover:text-error desktop:hover:bg-primary-gray w-full"
        variant="text"
        size="md"
        onClick={() => setIsModalOpen(true)}
      >
        {text}
      </Button>
    </div>
  );
};
