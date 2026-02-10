"use client";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ChatListItem } from "@/entities/chat/model/types";
import { useChatListStore } from "@/features/chatList/model/useChatListStore";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { createChat } from "../api/ws";
import { mapChatObjectToChatItem } from "../model/mapper";
import { useCreateChatStore } from "../model/store";

type SubmitCreateChatBtnProps = {
  className?: string;
};

export const SubmitCreateChatBtn: React.FC<SubmitCreateChatBtnProps> = ({ className }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { upsertChat } = useChatListStore();
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

        upsertChat(mapChatObjectToChatItem(response.object));

        queryClient.setQueryData(["chats"], (old: InfiniteData<ChatListItem[], string | null>) => {
          if (!old) return old;

          return {
            pages: old.pages.slice(0, 1),
            pageParams: old.pageParams.slice(0, 1),
          };
        });

        useChatListStore.getState().reset();

        await queryClient.refetchQueries({
          queryKey: ["chats"],
        });

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
