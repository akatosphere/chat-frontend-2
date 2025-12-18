import { fetchMessagesPage } from "@/features/chat/chat/api/mockChatApi";
import { mapApiMessage } from "@/features/chat/chat/lib/mapper";
import { ChatWidget } from "@/features/chat/chat/ui/chatWidget";
import { MessageList } from "@/features/chat/chat/ui/messageList";

export default async function ChatPage() {
  const CURRENT_USER_UID = "user-1";

  const page = await fetchMessagesPage();

  // мапим API-модель в наши типы
  const messages = page.results.map((apiMessage) =>
    mapApiMessage(apiMessage, CURRENT_USER_UID)
  );

  // находим объект текущего пользователя
  const currentUser = messages.find((m) => m.author.uid === CURRENT_USER_UID)
    ?.author || {
    uid: CURRENT_USER_UID,
    username: "Unknown",
    avatarUrl: "",
  };

  return (
    <div className="w-full h-screen desktop:w-[744px] desktop:h-[936px] border rounded-md">
      <ChatWidget initialMessages={messages} currentUser={currentUser} />
    </div>
  );
}
