import { ApiMessage } from "@/shared/api/types";

import { Message } from "../model/types";

export const mapApiMessage = (api: ApiMessage, currentUserUid: string): Message => {
  return {
    id: api.id,
    uid: api.uid,
    author: {
      uid: api.from_user.uid,
      username: api.from_user.username,
      avatarUrl: api.from_user.avatar_webp_url || api.from_user.avatar_url,
      firstName: api.from_user.first_name,
      lastName: api.from_user.last_name,
      nickname: api.from_user.nickname,
    },
    content: api.content,
    files: api.files_list.map((file) => ({
      id: file.id,
      url: file.file_url,
      webpUrl: file.file_webp_url,
      type: file.file_type,
    })),
    createdAt: new Date(api.created_at * 1000),
    isMine: api.from_user.uid === currentUserUid,
    status: api.new ? "sent" : "delivered",
    replyTo: api.replied_messages?.map((m) => mapApiMessage(m, currentUserUid)),
  };
};
