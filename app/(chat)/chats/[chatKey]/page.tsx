import { notFound } from "next/navigation";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { ChatLayoutWidget } from "@/features/chat/chat/ui/chatLayoutWidget";

type ChatPageProps = {
  // В Next.js 15+ params — это Promise
  params: Promise<{ chatKey: string }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatKey } = await params;

  // Выполняем запрос на сервере
  const result = await getChatServer(chatKey);

  if (!result.success) {
    // Если чат не найден — показываем 404
    console.log("getChatServer: !result.success");

    return notFound();
  }

  return <ChatLayoutWidget chatKey={chatKey} initialData={result.data} />;
}
