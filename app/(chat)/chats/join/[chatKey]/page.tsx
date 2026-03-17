import { Suspense } from "react";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getMessages } from "@/entities/chat/api/getMessages";
import { getChatTypeLight } from "@/entities/chat/lib/getChatTypeLight";
import { getInitialJoin } from "@/entities/chat/lib/getInitialJoin";
import { mapChatMessages } from "@/features/chat/chat/model/mapper";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

import { ChatPreviewClientLoader } from "./chatPreviewModal";

type PageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function Page({ params }: PageProps) {
  const { chatKey } = await params;

  const chatInfo = await getChatServer(chatKey, getChatTypeLight(chatKey));

  if (chatInfo?.success) {
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

  return (
    <Suspense>
      <ChatPreviewClientLoader chatKey={chatKey} />
    </Suspense>
  );
}
