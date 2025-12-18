import { cn } from "@/shared/shadcn/lib/utils";
import { Message } from "../model/types";
import { groupMessagesByDate } from "../lib/getMessageByDate";
import { MessageGroup } from "./messageGroup";

type MessageListProps = {
  className?: string;
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = ({
  className,
  messages,
}) => {
  const groups = groupMessagesByDate(messages);
  return (
    <div
      className={cn(
        "flex flex-col justify-end gap-3 desktop:gap-5 px-4 py-4 desktop:py-2 bg-accent  desktop:bg-light-tone-gray overflow-y-scroll h-full",
        className
      )}
    >
      {groups.map((group) => (
        <MessageGroup key={group.id} group={group} />
      ))}
    </div>
  );
};
