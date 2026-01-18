"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AvatarSection } from "@/shared/avatar/ui/avatarSelection";
import { fileToBase64 } from "@/shared/lib/files/fileToBase64";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { createChat } from "../api/ws";
import { mapChatType } from "../model/mapping";
import { formSchema } from "../model/schema";
import { CreateChatFormValues } from "../model/types";
import { Field } from "./field";
import { ChatTypeSelect } from "./сhatTypeSelect";

type CreateChatFormProps = {
  className?: string;
};

export const CreateChatForm: React.FC<CreateChatFormProps> = ({ className }) => {
  const [chatType, setChatType] = useState<"open" | "closed">("closed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const router = useRouter();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      avatar: null,
    },
  });

  const { isValid, isSubmitting, errors } = form.formState;

  const handleAvatarChange = (file: File) => {
    // 1. Сохраняем файл в форму
    form.setValue("avatar", file, { shouldValidate: true });

    // 2. Создаем временную ссылку для отображения превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsModalOpen(false);
  };

  const handleAvatarDelete = () => {
    form.setValue("avatar", null);
    setPreviewUrl("");
    setIsModalOpen(false);
  };

  const onSubmit = async (data: CreateChatFormValues) => {
    try {
      let avatarBase64 = null;
      // Если файл выбран, конвертируем его в формат для WS
      if (data.avatar instanceof File) {
        const base64String = await fileToBase64(data.avatar);
        avatarBase64 = {
          filename: data.avatar.name,
          data: base64String.split(",")[1], // Чистый base64 без префикса
        };
      }

      const response = await createChat({
        name: data.title,
        description: data.description,
        chat_type: mapChatType(chatType),
        uid_users_list: [], // пока только создатель
        avatar: avatarBase64,
      });

      if (response.status === "OK") {
        const chatKey = response.object.chat_key;
        router.push(`/chats/${chatKey}`);
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
    <section className={cn("h-full pb-4", className)}>
      <FormProvider {...form}>
        <form className="mb-4 flex h-full flex-col px-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex w-full flex-col gap-4">
              <AvatarSection
                avatarUrl={previewUrl} // Прокидываем наше превью
                onAvatarDelete={handleAvatarDelete}
                onAvatarChange={handleAvatarChange} // Передаем функцию обработки файла
                isAvatarChangeModalOpen={isModalOpen}
                setIsAvatarChangeModalOpen={setIsModalOpen}
                error={errors.avatar?.message as string}
                avatarVariant="group"
              />
              <div>
                <Field name="title" title="Название*" maxLength={100} position="upper" />
                <Field name="description" title="Описание" maxLength={250} position="lower" />
              </div>
              <ChatTypeSelect value={chatType} onChange={setChatType} />
            </div>
            <div className="w-full">
              <Button
                variant="default"
                size="md"
                type="submit"
                className="mt-4 mb-4 w-full"
                disabled={!isValid || isSubmitting}
              >
                Создать
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
