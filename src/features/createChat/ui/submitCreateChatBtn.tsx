"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { createChat } from "../api/ws";
import { useCreateChatStore } from "../model/store";

type SubmitCreateChatBtnProps = {
  className?: string;
};

export const SubmitCreateChatBtn: React.FC<SubmitCreateChatBtnProps> = ({ className }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, reset } = useCreateChatStore();

  const handleCreateChat = async () => {
    setIsSubmitting(true);

    try {
      const response = await createChat({
        name: formData.title,
        description: formData.description,
        chat_type: formData.chat_type,
        uid_users_list: formData.uid_users_list,
        avatar: formData.avatar,
      });

      if (response.status === "OK") {
        const chatKey = response.object.chat_key;
        reset();
        router.push(`/chats/${chatKey}`);
      } else {
        console.error("Ошибка сервера:", response.error);
        alert(`Ошибка: ${response.error}`);
      }
    } catch (error) {
      console.error("Ошибка при создании чата:", error);
      alert("Не удалось отправить запрос. Проверьте соединение.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button className={cn("", className)} onClick={handleCreateChat} disabled={isSubmitting}>
      {isSubmitting ? "Создание..." : "Создать"}
    </Button>
  );
};
