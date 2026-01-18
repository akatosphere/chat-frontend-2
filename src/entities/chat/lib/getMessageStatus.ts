import { MessageStatus } from "../model/types";

export const getMessageStatus = (
  fromUser: string | null,
  userId: string,
  isMessageNew?: boolean,
): MessageStatus | null => {
  if (!fromUser) return null;
  if (fromUser !== userId) return null;

  if (isMessageNew === true) return "delivered";

  if (isMessageNew === false) return "sent";

  return "pending";
};
