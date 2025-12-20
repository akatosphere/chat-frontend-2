import { notFound } from "next/navigation";

import { ChatFooter } from "@/widgets/chat/chatFooter/ui/chatFooter";

interface ChatPageProps {
  params: Promise<{ chatId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  if (!chatId) {
    notFound();
  }

  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1 overflow-y-auto">{/* messages */}</main>

      <ChatFooter />
    </div>
  );
}
