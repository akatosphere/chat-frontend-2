import { notFound } from "next/navigation";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getMessages } from "@/entities/chat/api/getMessages";
import { mapChatMessages } from "@/features/chat/chat/model/mapper";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

type ChatPageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatKey } = await params;

  const getChatType = () => {
    if (chatKey.startsWith("group")) return "group";
    if (chatKey.startsWith("channel")) return "channel";
    return "chat";
  };

  const chatInfo = await getChatServer(chatKey, getChatType());
  if (!chatInfo?.success) return notFound();

  const messagesResult = await getMessages({
    uid: chatInfo.data.uid,
    page: 1,
    page_size: 50,
    ordering: "-created_at",
  });

  const messages = messagesResult.success ? mapChatMessages(messagesResult.data.results) : [];

  return (
    <>
      <ChatWidget
        chatKey={chatKey}
        chatType={chatInfo.type}
        initialChatInfo={chatInfo.data}
        initialMessages={messages}
      />
    </>
  );
}
