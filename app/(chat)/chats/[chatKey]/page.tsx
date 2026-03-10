import { notFound } from "next/navigation";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getChatType } from "@/shared/lib/getChatType";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

type ChatPageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatKey } = await params;

  const chatInfo = await getChatServer(chatKey, getChatType(chatKey));

  if (!chatInfo?.success) return notFound();

  return (
    <>
      <ChatWidget
        chatKey={chatKey}
        chatType={chatInfo.type}
        chatUid={chatInfo.data.uid}
        initialChatInfo={chatInfo.data}
      />
    </>
  );
}
