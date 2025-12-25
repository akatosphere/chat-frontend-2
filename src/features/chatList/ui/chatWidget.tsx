"use client";
import { fetchMessagesPage } from "@/features/chat/chat/api/mockChatApi";
import { mapApiMessage } from "@/features/chat/chat/lib/mapper";
import { ChatWidget } from "@/features/chat/chat/ui/chatWidget";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatHeader } from "@/widgets/activeChatHeader/ui/chatHeader";

type ChatWidgetProps = {
  className?: string;
};

export const ChatLayoutWidget: React.FC<ChatWidgetProps> = async ({ className }) => {
  const CURRENT_USER_UID = "user-1";

  const page = await fetchMessagesPage();

  const messages = page.results.map((apiMessage) => mapApiMessage(apiMessage, CURRENT_USER_UID));

  const currentUser = messages.find((m) => m.author.uid === CURRENT_USER_UID)?.author || {
    uid: CURRENT_USER_UID,
    username: "Unknown",
    avatarUrl: "",
  };
  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <ChatHeader
        name="Иван"
        status="online"
        onCallClick={() => {}}
        onSearchClick={() => {}}
        onPhotoClick={() => {}}
        onInfoClick={() => {}}
      />
      <ChatWidget initialMessages={messages} currentUser={currentUser} className="flex-1" />
      <div className="min-h-15 w-full bg-white">Footer</div>
    </div>
  );
};
