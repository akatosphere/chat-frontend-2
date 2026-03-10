import { headers } from "next/headers";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getChatType } from "@/shared/lib/getChatType";
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

  const chatInfo = await getChatServer(chatKey, getChatType(chatKey));

  if (!chatInfo?.success) {
    return (
      <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
        Выберите контакт для общения
      </div>
    );
  }

  return (
    <ChatWidget
      chatKey={chatKey}
      chatType={chatInfo.type}
      initialChatInfo={chatInfo.data}
      chatUid={chatInfo.data.uid}
    />
  );
}
