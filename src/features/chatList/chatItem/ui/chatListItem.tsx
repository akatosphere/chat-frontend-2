import { cn } from "@/shared/shadcn/lib/utils";
import { ChatItemData } from "../model/types";
import { Avatar } from "./avatar";
import { Header } from "./header";
import { Footer } from "./footer";

type ChatListItemProps = {
  chat: ChatItemData;
  isActive?: boolean;
  onClick: (id: number) => void;
};

export const ChatListItem = ({
  chat,
  isActive,
  onClick,
}: ChatListItemProps) => {
  const totalUnread = chat.new_message_count + chat.new_file_count;
  const user = chat.chat;

  return (
    <div className="py-1">
      <div
        className={cn(
          "flex gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-colors duration-200 items-stretch",
          "hover:bg-primary-hover",
          chat.is_favorite && "bg-white",
          isActive && "bg-primary-accent hover:bg-primary-accent"
        )}
        onClick={() => onClick(chat.id)}
      >
        <Avatar isOnline={user.is_online} avatarUrl={user.avatar_url || ""} />
        <div className="flex-1 min-w-0 flex flex-col justify-between relative after:content-[''] after:absolute after:left-0 after:right-0 after:h-px after:bg-gray after:opacity-15 after:top-[calc(100%+10px)]">
          <Header chat={chat} isActive={isActive} />
          <Footer
            isFavorite={chat.is_favorite}
            lastMsg={chat.last_message}
            isActive={isActive}
            totalUnread={totalUnread}
          />
        </div>
      </div>
    </div>
  );
};
