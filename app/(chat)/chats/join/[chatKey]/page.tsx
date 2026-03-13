import { getGroupChannelServer } from "@/entities/chat/api/getGroupChannelServer";
import { getMessages } from "@/entities/chat/api/getMessages";
import { mapChatMessages } from "@/features/chat/chat/model/mapper";
import { ChatWidget } from "@/widgets/chat/chatWidget/chatWidget";

type PageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function Page({ params }: PageProps) {
  const { chatKey } = await params;
  const response = await getGroupChannelServer(chatKey);
  if (response.success) {
    const isPrivate =
      response.data.type == "private-channel" || response.data.type == "private-group";
    if (isPrivate) {
      return (
        <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
          Приватный чат
        </div>
      );
    } else {
      const messagesResult = await getMessages({
        uid: response.data.uid,
        page: 1,
        page_size: 50,
        ordering: "-created_at",
      });
      const messages = messagesResult.success ? mapChatMessages(messagesResult.data.results) : [];

      return (
        <ChatWidget
          chatKey={chatKey}
          chatType={response.data.type}
          chatKeyUser={messages[0]?.chatKey || null}
          initialChatInfo={response.data}
          initialMessages={messages}
        />
      );
    }
  } else {
    return (
      <div className="desktop:flex text-error hidden h-full w-full items-center justify-center">
        Ошибка загрузки чата
      </div>
    );
  }
}
