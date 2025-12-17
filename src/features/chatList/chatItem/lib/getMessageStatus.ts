import { MessageStatus } from "../model/types";

export function getMessageStatus(
  fromUser: string,
  userId: string,
  isMessageNew?: boolean
): MessageStatus | null {
  if (fromUser !== userId) return null;
  if (isMessageNew === false) return "delivered";
  if (isMessageNew === true) return "sent";
  return "pending";
}
