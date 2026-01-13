"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { EditPhotoForm } from "@/shared/form/ui/editPhotoForm";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { createGroup } from "../api/ws";
import { mapGroupType } from "../model/mapping";
import { formSchema } from "../model/schema";
import { CreateGroupFormValues } from "../model/types";
import { Field } from "./field";
import { GroupTypeSelect } from "./groupTypeSelect";

type CreateGroupFormProps = {
  className?: string;
};

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ className }) => {
  const [groupType, setGroupType] = useState<"open" | "closed">("closed");
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { isValid, isSubmitting } = form.formState;
  const router = useRouter();

  const onSubmit = async (data: CreateGroupFormValues) => {
    try {
      const response = await createGroup({
        name: data.title,
        description: data.description,
        chat_type: mapGroupType(groupType),
        uid_users_list: [], // пока только создатель
      });
      if (response.status === "OK") {
        const chatId = response.object.chat_id; // Используем chat_id из вашего JSON
        router.push(`/chats/${chatId}`);
      } else {
        // Обработка ошибки, если статус не "OK"
        console.error("Ошибка сервера:", response.error);
        alert(`Ошибка: ${response.error}`);
      }
    } catch (error) {
      console.error("Ошибка при создании чата:", error);
    }
  };

  return (
    <section className={cn("", className)}>
      <div className="flex justify-center">
        <EditPhotoForm />
      </div>
      <FormProvider {...form}>
        <form className="mb-4 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Field name="title" title="Название*" maxLength={100} position="upper" />
            <Field name="description" title="Описание" maxLength={250} position="lower" />
          </div>
          <GroupTypeSelect value={groupType} onChange={setGroupType} />

          <Button
            variant="default"
            size="md"
            type="submit"
            className="mt-4"
            disabled={!isValid || isSubmitting}
          >
            Создать
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
