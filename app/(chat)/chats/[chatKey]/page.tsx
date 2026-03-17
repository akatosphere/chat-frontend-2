import { notFound } from "next/navigation";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getChatTypeLight } from "@/entities/chat/lib/getChatTypeLight";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

import { getInitialJoin } from "../../../../src/entities/chat/lib/getInitialJoin";

type ChatPageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatKey } = await params;

  const chatInfo = await getChatServer(chatKey, getChatTypeLight(chatKey));

  if (!chatInfo?.success) return notFound(); // тут проблема с приватными чатами

  const initialJoin = await getInitialJoin(chatInfo.data);

  return (
    <>
      <ChatWidget
        chatKey={chatKey}
        chatType={chatInfo.type}
        chatUid={chatInfo.data.uid}
        initialChatInfo={chatInfo.data}
        initialJoin={initialJoin}
      />
    </>
  );
}
