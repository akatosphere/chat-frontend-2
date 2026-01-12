import { ChatLayoutWidget } from "@/features/chatList/ui/chatLayoutWidget";
type ChatPageParams = { params: Promise<{ chatId: string }> };
export default async function ChatPage({ params }: ChatPageParams) {
  const { chatId } = await params;
  return <ChatLayoutWidget chatId={chatId} />;
}
