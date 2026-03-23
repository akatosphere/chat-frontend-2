import { notFound } from "next/navigation";

import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getChatTypeLight } from "@/entities/chat/lib/getChatTypeLight";
import { ChatInviteJoinView } from "@/features/joinToChat/ui/chatInviteJoinView";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

import { getInitialJoin } from "../../../../src/entities/chat/lib/getInitialJoin";

type ChatPageProps = {
  params: Promise<{ chatKey: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function ChatPage({ params, searchParams }: ChatPageProps) {
  const { chatKey } = await params;
  const { token } = await searchParams;
  console.log("token: ", token);

  const chatInfo = await getChatServer(chatKey, getChatTypeLight(chatKey));

  if (!chatInfo?.success) {
    if (token) {
      return <ChatInviteJoinView chatKey={chatKey} token={token} />;
    }
    return notFound();
  }

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
