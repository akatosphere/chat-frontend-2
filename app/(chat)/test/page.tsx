import { fetchMessagesPage } from "@/features/chat/chat/api/mockChatApi";
import { mapApiMessage } from "@/features/chat/chat/lib/mapper";
import { ChatWidget } from "@/features/chat/chat/ui/chatWidget";

export default async function ChatPage() {
  const CURRENT_USER_UID = "user-1";

  const page = await fetchMessagesPage();

  const messages = page.results.map((apiMessage) => mapApiMessage(apiMessage, CURRENT_USER_UID));

  const currentUser = messages.find((m) => m.author.uid === CURRENT_USER_UID)?.author || {
    uid: CURRENT_USER_UID,
    username: "Unknown",
    avatarUrl: "",
  };

  return (
    <div className="desktop:w-[744px] desktop:h-[936px] h-screen w-full rounded-md border">
      <ChatWidget initialMessages={messages} currentUser={currentUser} />
    </div>
  );
}
