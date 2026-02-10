import { v4 as uuid } from "uuid";

import { sendWSRequest } from "@/shared/api/ws/wsClient";
import { WS_ACTIONS } from "@/shared/constants/constants";

export const sendReadStatus = ({ chatKey, idOrUid }: { chatKey: string; idOrUid: string }) =>
  sendWSRequest(
    WS_ACTIONS.CHANGE_STATUS_READ_MESSAGE,
    {
      chat_key: chatKey,
      uid: idOrUid,
      new_read_status: false,
    },
    uuid(),
  );
