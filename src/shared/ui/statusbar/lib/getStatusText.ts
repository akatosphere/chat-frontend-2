import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { pluralize } from "@/shared/lib/pluralize";

import { formatOnlineTime } from "./formatOnlineTime";

export const getStatusText = (
  chatType: ChatType,
  membersCount?: number,
  time?: number | null,
  isOnline?: boolean | null,
) => {
  if ((chatType === "public-group" || chatType === "private-group") && membersCount !== undefined) {
    return `${membersCount + 1} ${pluralize(membersCount + 1, "участник", "участника", "участников")}`;
  }

  if (
    (chatType === "public-channel" || chatType === "private-channel") &&
    membersCount !== undefined
  ) {
    return `${membersCount + 1} ${pluralize(membersCount + 1, "подписчик", "подписчика", "подписчиков")}`;
  }
  return formatOnlineTime(time || 0, isOnline);
};
