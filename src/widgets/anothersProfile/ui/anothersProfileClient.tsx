import { getChatServer } from "@/entities/chat/api/getChatServer";
import { getChatType } from "@/shared/lib/getChatType";

import { AnothersProfile } from "./anothersProfile";

type AnothersProfileClientProps = {
  chatKey: string;
};

export const AnothersProfileClient: React.FC<AnothersProfileClientProps> = async ({ chatKey }) => {
  let data = null;
  const chatType = getChatType(chatKey);
  const response = await getChatServer(chatKey, chatType);
  if (response.success) {
    data = response.data;
  }
  return <AnothersProfile chatKey={chatKey} initialData={data} />;
};
