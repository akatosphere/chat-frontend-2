import { ChatLayoutWidget } from "@/features/chatList/ui/chatLayoutWidget";

type Props = {
  params: Promise<{ chatId: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { chatId } = await params;
  return <ChatLayoutWidget chatId={chatId} />;
}
