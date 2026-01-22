import Link from "next/link";
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

  const chatInfo = await getChatServer(chatKey);
  if (!chatInfo.success) return notFound();

  const messagesResult = await getMessages({
    user_uid: chatKey,
    page: 1,
    page_size: 50,
    ordering: "-created_at",
  });

  if (!messagesResult.success) {
    return notFound();
  }

  const messages = mapChatMessages(messagesResult.data.results);

  return (
    <>
      <div className="fixed top-0 left-0 flex flex-row gap-4">
        <Link href="http://localhost:3000/chats/group_03c0a3a0-6f06-4c58-bd3d-5242ba16a1ea">
          Первый чат
        </Link>
        <Link href="http://localhost:3000/chats/group_c2a7ded2-ee5e-4074-a4e4-5a0d45f95ee2">
          Второй чат
        </Link>
      </div>
      <ChatWidget chatKey={chatKey} initialChatInfo={chatInfo.data} initialMessages={messages} />
    </>
  );
}
