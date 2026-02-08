import { getChatServer } from "@/entities/chat/api/getChatServer";
import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { isInContactServer } from "@/entities/contact/lib/isInContactServer";
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
      <AnothersProfile initialData={null} isInContact={false} />
    ) : (
      <ChatProfile initialData={null} />
    );
  }

  if (chatType === "chat") {
    const isInContact = await isInContactServer(chatKey);
    return <AnothersProfile initialData={response.data as User | null} isInContact={isInContact} />;
  }

  return <ChatProfile initialData={response.data as MappedChatDetails | null} />;
};
