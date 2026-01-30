import { ChatType } from "@/features/chat/chat/model/types/serverTypes";

import { getGroupChannelServer } from "./getGroupChannelServer";
import { getUserByUIDServer } from "./getUserByUIDServer";

// Здесь будет импорт функции для личных чатов, когда вы её напишете
// import { getPrivateChatServer } from "./getPrivateChatServer";

export const getChatServer = async (chatKey: string, chatType: "group" | "channel" | "chat") => {
  if (chatType === "group" || chatType === "channel") {
    const groupRes = await getGroupChannelServer(chatKey);
    if (groupRes.success) {
      return { data: groupRes.data, success: true, type: groupRes.data.type };
    }
    return groupRes;
  }

  const privateRes = await getUserByUIDServer(chatKey);
  if (privateRes.success) {
    return { data: privateRes.data, success: true, type: "chat" as ChatType };
  }
  return privateRes;
};
