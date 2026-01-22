import { SendingStatus } from "@/features/chat/chat/model/types/serverTypes";
import { MESSAGE_STATUS } from "@/shared/constants/constants";

export const getMessageStatus = (
  isNew: boolean,
  status?: SendingStatus | null,
): SendingStatus | null => {
  if (status === MESSAGE_STATUS.PENDING) return MESSAGE_STATUS.PENDING;
  if (status === MESSAGE_STATUS.FAILED) return MESSAGE_STATUS.FAILED;
  return isNew ? MESSAGE_STATUS.DELIVERED : MESSAGE_STATUS.READ;
};
