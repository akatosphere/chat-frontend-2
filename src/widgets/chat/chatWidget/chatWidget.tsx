"use client";

import { useState } from "react";

import { addMembersToChat } from "@/entities/chat/api/addMemberToChat";
import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { UserPreview } from "@/entities/user/model/types";
import { normalizeChatInfo } from "@/features/chat/chat/lib/normalizeChatInfo";
import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { pluralize } from "@/shared/lib/pluralize";
import { cn } from "@/shared/shadcn/lib/utils";

import { MappedChatMessage } from "../../../features/chat/chat/model/types/mappedTypes";
import { Chat } from "../../../features/chat/chat/ui/chat";
import { ChatHeader } from "../chatHeader/ui/chatHeader";

type ChatWidgetProps = {
  className?: string;
  chatKey: string;
  chatKeyUser: string | null;
  chatType: ChatType;
  initialChatInfo: MappedChatDetails | UserPreview;
  initialMessages: MappedChatMessage[];
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  className,
  initialChatInfo,
  chatType,
  initialMessages,
  chatKey,
  chatKeyUser,
}) => {
  // Тестовое добавление участников. Потом удалить
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [uidInputValue, setUidInputValue] = useState("");

  // Приводит пришедшие данные к единому интерфейсу
  const chatInfo = normalizeChatInfo(initialChatInfo);

  // Единственное название чата в зависимости от типа
  const chatName = chatInfo.title || chatInfo.firstName || "Unknown";
  const chatAvatar = chatInfo.avatar || chatInfo.avatarUrl || "";

  // Тестовое добавление участников. Потом удалить
  const handleUidSubmit = async () => {
    try {
      const added = await addMembersToChat({
        chat_key: chatKey,
        uid_users_list: [uidInputValue],
      });

      console.log("Добавленные пользователи:", added.added_users);
    } catch (e) {
      console.error("Ошибка добавления участников:", e);
    }
  };

  // Функция для получения текста статуса.
  const getStatusText = () => {
    // Если это группа или канал — показываем кол-во участников
    if (
      (chatType === "public-group" || chatType === "private-group") &&
      chatInfo.membersCount !== undefined
    ) {
      return `${chatInfo.membersCount + 1} ${pluralize(chatInfo.membersCount + 1, "участник", "участника", "участников")}`;
    }

    if (
      (chatType === "public-channel" || chatType === "private-channel") &&
      chatInfo.membersCount !== undefined
    ) {
      return `${chatInfo.membersCount + 1} ${pluralize(chatInfo.membersCount + 1, "подписчик", "подписчика", "подписчиков")}`;
    }
    return "online";
  };

  return (
    <div className={cn("desktop:h-full flex h-dvh w-full flex-col", className)}>
      <div className="relative h-0 w-0 self-center">
        <div
          onClick={() => setIsAddUserModalOpen(!isAddUserModalOpen)}
          className="bg-primary absolute top-0 left-0 h-5 w-5 text-center text-white"
        >
          \/
        </div>
        {isAddUserModalOpen && (
          <div className="absolute top-6 left-[50%] flex -translate-x-1/2 gap-1">
            <input
              className="border-primary w-100 border bg-white"
              value={uidInputValue}
              onChange={(e) => setUidInputValue(e.target.value)}
              type="text"
              placeholder="uid собеседника, которого нужно добавить"
            />
            <button className="bg-primary p-1 text-white" onClick={handleUidSubmit}>
              +
            </button>
          </div>
        )}
      </div>

      <ChatHeader
        name={chatName}
        status={getStatusText()}
        backHref="/chats"
        photo={chatAvatar}
        onCallClick={() => {}}
        onSearchClick={() => {}}
        onPhotoClick={() => {}}
        onInfoClick={() => {}}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Chat
          initialMessages={initialMessages}
          chatKey={chatKey}
          chatType={chatType}
          chatKeyUser={chatKeyUser}
          createdBy={chatInfo.createdBy}
        />
      </div>
    </div>
  );
};
