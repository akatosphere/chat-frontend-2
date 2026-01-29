import { MessageStatus } from "../model/types";

export const getMessageStatus = (
  fromUser: string | null,
  userId: string | null,
  isMessageNew?: boolean,
): MessageStatus | null => {
  if (!fromUser) return null;
  if (fromUser !== userId) return null;
  if (isMessageNew === false) return "delivered";
  if (isMessageNew === true) return "sent";
  return "pending";
};
