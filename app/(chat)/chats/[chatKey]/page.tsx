import { notFound } from "next/navigation";

import { getChatPreviewServer } from "@/entities/chat/api/getChatPreviewServer";
import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getMessages } from "@/entities/chat/api/getMessages";
import { getChatTypeLight } from "@/entities/chat/lib/getChatTypeLight";
import { mapChatMessages } from "@/features/chat/chat/model/mapper";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

import { getInitialJoin } from "../../../../src/entities/chat/lib/getInitialJoin";

type ChatPageProps = {
  params: Promise<{ chatKey: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function ChatPage({ params, searchParams }: ChatPageProps) {
  const { chatKey } = await params;
  const { token } = await searchParams;

  if (token) {
    const chatPreview = await getChatPreviewServer(token);

    if (!chatPreview.success) {
      return <div>ссылка недействительна</div>;
    }

    return (
      <div>
        <p>{chatPreview.data.name}</p>
        <p>{chatPreview.data.description}</p>
        <p>{chatPreview.data.participantsCount}</p>
      </div>
    );
  }

  const chatInfo = await getChatServer(chatKey, getChatTypeLight(chatKey));

  if (!chatInfo?.success) {
    return notFound();
  }

  const [messagesResult, initialJoin] = await Promise.all([
    getMessages({ uid: chatInfo.data.uid, page: 1, page_size: 50, ordering: "-created_at" }),
    getInitialJoin(chatInfo.data),
  ]);

  const messages = messagesResult.success ? mapChatMessages(messagesResult.data.results) : [];
  return (
    <>
      <ChatWidget
        chatKey={chatKey}
        chatType={chatInfo.type}
        chatKeyUser={messages[0]?.chatKey || null}
        initialChatInfo={chatInfo.data}
        initialMessages={messages}
        initialJoin={initialJoin}
      />
    </>
  );
}
