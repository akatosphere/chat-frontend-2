"use client";
import { useState } from "react";

import { ChatItemData } from "@/entities/chat/model/types";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { InfoMessage } from "@/shared/ui/infoMessage";

import { ChatListItem } from "./chatListItem";

interface ChatListProps {
  className?: string;
  chats: ChatItemData[];
  isSearch?: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, className, isSearch }) => {
  const [activeId, setActiveId] = useState<number>();

  return (
    <div
      className={cn(
        "list-scrollbar desktop:px-2 flex flex-1 flex-col overflow-y-auto px-4",
        className,
      )}
    >
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatListItem
            className="last:after:hidden"
            key={chat.id}
            chat={chat}
            isActive={activeId === chat.id}
            onClick={() => setActiveId(chat.id)}
            isLast={chat.id === chats[chats.length - 1].id}
          />
        ))
      ) : (
        <div className="flex flex-1 justify-center px-2 pt-40">
          {!isSearch && (
            <div className="flex w-full flex-col items-center">
              <InfoMessage
                imgSrc="/info/chatsNotExist.svg"
                title="У вас пока нет чатов"
                description="Начните общение и здесь всё появится"
              />
              <Button variant="default" size="lg" className="mt-10 w-full">
                Начать чат
              </Button>
            </div>
          )}
          {isSearch && (
            <InfoMessage
              imgSrc="/info/chatNotFound.svg"
              title="Поиск не дал результатов"
              description="По вашему запросу ничего не найдено. Измените запрос и попробуйте снова"
            />
          )}
        </div>
      )}
    </div>
  );
};
