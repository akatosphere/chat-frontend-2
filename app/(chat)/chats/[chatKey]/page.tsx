import { notFound } from "next/navigation";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getMessages } from "@/entities/chat/api/getMessages";
import { getChatTypeLight } from "@/entities/chat/lib/getChatTypeLight";
import { mapChatMessages } from "@/features/chat/chat/model/mapper";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

type ChatPageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatKey } = await params;

  const chatInfo = await getChatServer(chatKey, getChatTypeLight(chatKey));

  if (!chatInfo?.success) return notFound();

  const messagesResult = await getMessages({
    uid: chatInfo.data.uid,
    page: 1,
    page_size: 50,
    ordering: "-created_at",
  });

  console.log("messagesResult", messagesResult);
  const messages = messagesResult.success ? mapChatMessages(messagesResult.data.results) : [];
  return (
    <>
      <ChatWidget
        chatKey={chatKey}
        chatType={chatInfo.type}
        chatKeyUser={messages[0]?.chatKey || null}
        initialChatInfo={chatInfo.data}
        initialMessages={messages}
      />
    </>
  );
}
