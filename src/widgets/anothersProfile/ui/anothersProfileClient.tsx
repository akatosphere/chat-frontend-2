import { getChatServer } from "@/entities/chat/api/getChatServer";
import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { getContactsServer } from "@/entities/contact/api/getContactsServer";
import { User } from "@/entities/user/model/types";
import { getChatType } from "@/shared/lib/getChatType";

import { AnothersProfile } from "./anothersProfile";
import { ChatProfile } from "./chatProfile";

type AnothersProfileClientProps = {
  chatKey: string;
};

export const AnothersProfileClient: React.FC<AnothersProfileClientProps> = async ({ chatKey }) => {
  const chatType = getChatType(chatKey);
  const response = await getChatServer(chatKey, chatType);

  if (!response.success) {
    return chatType === "chat" ? (
      <AnothersProfile initialData={null} />
    ) : (
      <ChatProfile initialData={null} />
    );
  }

  if (chatType === "chat") {
    const contacts = await getContactsServer();
    return (
      <AnothersProfile initialData={response.data as User | null} contactsInitialData={contacts} />
    );
  }

  return <ChatProfile initialData={response.data as MappedChatDetails | null} />;
};
