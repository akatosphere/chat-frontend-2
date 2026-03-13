import { headers } from "next/headers";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getMessages } from "@/entities/chat/api/getMessages";
import { getChatTypeLight } from "@/entities/chat/lib/getChatTypeLight";
import { getInitialJoin } from "@/entities/chat/lib/getInitialJoin";
import { mapChatMessages } from "@/features/chat/chat/model/mapper";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

const extractChatKey = (pathname: string): string | null => {
  const match = pathname.match(/^\/chats\/([^/]+)/);
  return match ? match[1] : null;
};

export default async function ChatsPage() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const chatKey = extractChatKey(pathname);

  if (!chatKey) {
    return (
      <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
        Выберите контакт для общения
      </div>
    );
  }

  const chatInfo = await getChatServer(chatKey, getChatTypeLight(chatKey));

  if (!chatInfo?.success) {
    return (
      <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
        Выберите контакт для общения
      </div>
    );
  }

  const [messagesResult, initialJoin] = await Promise.all([
    getMessages({ uid: chatInfo.data.uid, page: 1, page_size: 50, ordering: "-created_at" }),
    getInitialJoin(chatInfo.data),
  ]);

  const messages = messagesResult.success ? mapChatMessages(messagesResult.data.results) : [];

  return (
    <ChatWidget
      chatKey={chatKey}
      chatType={chatInfo.type}
      chatKeyUser={messages[0]?.chatKey || null}
      initialChatInfo={chatInfo.data}
      initialMessages={messages}
      initialJoin={initialJoin}
    />
  );
}
