import { cn } from "@/shared/shadcn/lib/utils";

import { groupMessagesByDate } from "../lib/getMessageByDate";
import { Message } from "../model/types";
import { MessageGroup } from "./messageGroup";

type MessageListProps = {
  className?: string;
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = ({ className, messages }) => {
  const groups = groupMessagesByDate(messages);
  return (
    <div
      className={cn(
        "desktop:gap-5 desktop:py-2 bg-accent desktop:bg-light-tone-gray flex h-full flex-col justify-end gap-3 overflow-y-scroll px-4 py-4",
        className,
      )}
    >
      {groups.map((group) => (
        <MessageGroup key={group.id} group={group} />
      ))}
    </div>
  );
};
