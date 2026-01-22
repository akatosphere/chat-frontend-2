import { v4 as uuid } from "uuid";

import { sendWSRequest } from "@/shared/api/wsClient";

export const sendReadStatus = ({ chatKey, idOrUid }: { chatKey: string; idOrUid: string }) =>
  sendWSRequest(
    "change_status_read_message",
    {
      chat_key: chatKey,
      id_or_uid: idOrUid,
      new_read_status: false,
    },
    uuid(),
  );
