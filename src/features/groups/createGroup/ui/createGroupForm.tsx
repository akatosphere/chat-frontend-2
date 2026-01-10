"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { EditPhotoForm } from "@/shared/form/ui/editPhotoForm";
import { Button } from "@/shared/shadcn/ui/button";

import { formSchema } from "../model/shema";
import { Field } from "./field";
import { GroupTypeSelect } from "./GroupTypeSelect";

export const CreateGroupForm = () => {
  const [groupType, setGroupType] = useState<"open" | "closed">("closed");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

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
      <FormProvider {...form}>
        <form className="mb-4 flex flex-col gap-4">
          <div>
            <Field name="title" title="Название*" maxLength={100} position="upper" />
            <Field name="description" title="Описание" maxLength={250} position="lower" />
          </div>
          <GroupTypeSelect value={groupType} onChange={setGroupType} />

          <Button variant="default" size="md">
            Далее
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
