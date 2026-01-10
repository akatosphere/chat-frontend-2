"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { EditPhotoForm } from "@/shared/form/ui/editPhotoForm";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { BackButton } from "@/shared/ui/backButton";

import { formSchema } from "../model/shema";
import { Field } from "./field";
import { GroupTypeSelect } from "./groupTypeSelect";

type CreateGroupFormProps = {
  className?: string;
};

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ className }) => {
  const [groupType, setGroupType] = useState<"open" | "closed">("closed");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <section className={cn("px-4", className)}>
      <div className="border-b-muted mb-4 flex h-14 items-center gap-2 border-b">
        <BackButton href="/chats" />

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
