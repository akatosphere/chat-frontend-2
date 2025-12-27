"use client";

import { mapApiMessage } from "@/features/chat/chat/lib/mapper";
import { mockMessagesPage } from "@/features/chat/chat/lib/mock";
import { Message } from "@/features/chat/chat/model/types";
import { ChatWidget } from "@/features/chat/chat/ui/chatWidget";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatHeader } from "@/widgets/activeChatHeader/ui/chatHeader";

import { mockChats } from "../lib/data";

type ChatWidgetProps = {
  className?: string;
  chatId: string;
};

// const CURRENT_USER_UID = "user-1"; // временно, потом из api

export const ChatLayoutWidget: React.FC<ChatWidgetProps> = ({ className, chatId }) => {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [sender, setSender] = useState<User | null>(null);
  // const [receiver, setReceiver] = useState<User | null>(null);

  // useEffect(() => {
  //   fetchMessagesPage().then((page) => {
  //     const mappedMessages = page.results.map((apiMessage) =>
  //       mapApiMessage(apiMessage, CURRENT_USER_UID),
  //     );

  //     setMessages(mappedMessages);

  //     const myMessage = mappedMessages.find((m) => m.isMine);
  //     if (myMessage) {
  //       setSender(myMessage.author);
  //     }

  //     const otherMessage = mappedMessages.find((m) => !m.isMine);
  //     if (otherMessage) {
  //       setReceiver(otherMessage.author);
  //     }
  //   });
  // }, [chatId]);

  // if(!sender || !receiver) {
  //   return null;
  // }

  const sender = {
    uid: "user-1",
    username: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    nickname: "",
  };

  const receiver = mockChats.results.find((chat) => chat.id === +chatId)?.chat;
  const testMessages = mockMessagesPage.results;
  const messages: Message[] =
    chatId === "3" ? testMessages.map((apiMessage) => mapApiMessage(apiMessage, sender.uid)) : [];

  const username =
    (receiver?.first_name ? receiver?.first_name : "") +
    " " +
    (receiver?.last_name ? receiver?.last_name : "");

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <ChatHeader
        name={username}
        status={"online"}
        backHref="/chats"
        photo={receiver?.avatar_url || ""}
        onCallClick={() => {}}
        onSearchClick={() => {}}
        onPhotoClick={() => {}}
        onInfoClick={() => {}}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatWidget initialMessages={messages} currentUser={sender} />
      </div>
    </div>
  );
};
