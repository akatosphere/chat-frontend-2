import Link from "next/link";

import { cn } from "@/shared/shadcn/lib/utils";

import { ChatItemData } from "../../../entities/chat/model/types";
import { Avatar } from "../../../entities/chat/ui/avatar";
import { ChatListItemFooter } from "./chatListItemFooter";
import { ChatListItemHeader } from "./chatListItemHeader";

type ChatListItemProps = {
  chat: ChatItemData;
  isActive?: boolean;
  onClick: () => void;
};

export const ChatListItem = ({ chat, isActive, onClick }: ChatListItemProps) => {
  const totalUnread = chat.new_message_count + chat.new_file_count;
  const user = chat.chat;

  return (
    <Link href={`/chats/${chat.id}`} className="py-1">
      <div
        className={cn(
          "flex cursor-pointer items-stretch gap-2 rounded-md px-2.5 py-1.5 transition-colors duration-200",
          "hover:bg-primary-hover",
          chat.is_favorite && "bg-white",
          isActive && "bg-primary-accent hover:bg-primary-accent",
        )}
        onClick={onClick}
      >
        <Avatar
          isOnline={user.is_online}
          avatarUrl={user.avatar_webp_url || user.avatar_url || ""}
        />
        <div className="after:bg-gray relative flex min-w-0 flex-1 flex-col justify-between after:absolute after:top-[calc(100%+10px)] after:right-0 after:left-0 after:h-px after:opacity-15 after:content-[''] last:after:hidden">
          <ChatListItemHeader chat={chat} isActive={isActive} />
          <ChatListItemFooter
            isFavorite={chat.is_favorite}
            lastMsg={chat.last_message}
            isActive={isActive}
            totalUnread={totalUnread}
          />
        </div>
      </div>
    </Link>
  );
};
