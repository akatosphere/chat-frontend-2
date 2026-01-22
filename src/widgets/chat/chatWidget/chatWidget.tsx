"use client";

import { useState } from "react";

import { addMembersToChat } from "@/entities/chat/api/addMemberToChat";
import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { pluralize } from "@/shared/lib/pluralize";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatHeader } from "@/widgets/activeChatHeader/ui/chatHeader";

import { MappedChatMessage } from "../../../features/chat/chat/model/types/mappedTypes";
import { Chat } from "../../../features/chat/chat/ui/chat";

type ChatWidgetProps = {
  className?: string;
  chatKey: string;
  initialChatInfo: MappedChatDetails;
  initialMessages: MappedChatMessage[];
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  className,
  initialChatInfo,
  initialMessages,
  chatKey,
}) => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [uidInputValue, setUidInputValue] = useState("");

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
  const getStatusText = () => {
    // Если это группа или канал — показываем кол-во участников
    if (
      initialChatInfo.type === "private-group" ||
      initialChatInfo.type === "public-group" ||
      initialChatInfo.type === "channel"
    ) {
      return `${initialChatInfo.membersCount + 1} ${pluralize(initialChatInfo.membersCount + 1, "участник", "участника", "участников")}`;
    }

    // Если это личный чат — пока оставляем "online" (в будущем будет приходить из WS)
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
        name={initialChatInfo.title}
        status={getStatusText()}
        backHref="/chats"
        photo={initialChatInfo.avatar || ""}
        onCallClick={() => {}}
        onSearchClick={() => {}}
        onPhotoClick={() => {}}
        onInfoClick={() => {}}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Chat initialMessages={initialMessages} chatKey={chatKey} chatType={initialChatInfo.type} />
      </div>
    </div>
  );
};
