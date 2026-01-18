"use client";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { mapApiMessage } from "@/features/chat/chat/lib/mapper";
import { mockMessagesPage } from "@/features/chat/chat/lib/mock";
import { Message } from "@/features/chat/chat/model/types";
import { ChatWidget } from "@/features/chat/chat/ui/chatWidget";
import { pluralize } from "@/shared/lib/pluralize";
import { cn } from "@/shared/shadcn/lib/utils";
import { ChatHeader } from "@/widgets/activeChatHeader/ui/chatHeader";

type ChatWidgetProps = {
  className?: string;
  chatKey: string;
  initialData: MappedChatDetails;
};

// const CURRENT_USER_UID = "user-1"; // временно, потом из api

export const ChatLayoutWidget: React.FC<ChatWidgetProps> = ({
  className,
  chatKey,
  initialData,
}) => {
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
  // Определяем текст статуса
  const getStatusText = () => {
    // Если это группа или канал — показываем кол-во участников
    if (
      initialData.type === "private-group" ||
      initialData.type === "public-group" ||
      initialData.type === "channel"
    ) {
      return `${initialData.membersCount + 1} ${pluralize(initialData.membersCount + 1, "участник", "участника", "участников")}`;
    }

    // Если это личный чат — пока оставляем "online" (в будущем будет приходить из WS)
    return "online";
  };

  const sender = {
    uid: "user-1",
    username: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    nickname: "",
  };

  const testMessages = mockMessagesPage.results;
  const messages: Message[] =
    chatKey === "3" ? testMessages.map((apiMessage) => mapApiMessage(apiMessage, sender.uid)) : [];

  // const username =
  //   (receiver?.first_name ? receiver?.first_name : "") +
  //   " " +
  //   (receiver?.last_name ? receiver?.last_name : "");

  return (
    <div className={cn("desktop:h-full flex h-dvh w-full flex-col", className)}>
      <ChatHeader
        name={initialData.title}
        status={getStatusText()}
        backHref="/chats"
        photo={initialData.avatar}
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
