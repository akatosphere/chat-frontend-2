"use client";

import Link from "next/link";
import { useState } from "react";

import { EditPhotoForm } from "@/shared/form/ui/editPhotoForm";
import { Button } from "@/shared/shadcn/ui/button";

import { GroupTypeSelect } from "./GroupTypeSelect";
import { NameDescriptionFields } from "./nameDescriptionFields";

export const CreateGroupForm = () => {
  const [groupType, setGroupType] = useState<"open" | "closed">("closed");

  return (
    <section className="px-4">
      <div className="border-b-muted mb-4 flex h-14 items-center gap-2 border-b">
        <Link
          href="/"
          aria-label="Назад"
          className="inline-flex h-10 w-10 items-center justify-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#1C1C1E" />
          </svg>
        </Link>

        <h2 className="text-tight font-medium">Создать группу</h2>
      </div>

      <div className="flex justify-center">
        <EditPhotoForm />
      </div>

      <form className="mb-4 flex flex-col gap-4">
        <NameDescriptionFields />

        <GroupTypeSelect value={groupType} onChange={setGroupType} />

        <Button variant="default" size="md">
          Далее
        </Button>
      </form>
    </section>
  );
};
