import { cn } from "@/shared/shadcn/lib/utils";
import { InfoMessage } from "@/shared/ui/infoMessage";

import { groupMessagesByDate } from "../lib/getMessageByDate";
import { Message } from "../model/types";
import { MessageGroup } from "./messageGroup";

type MessageListProps = {
  className?: string;
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = ({ className, messages }) => {
  const groups = messages && groupMessagesByDate(messages);

  return (
    <div
      className={cn(
        "desktop:gap-5 desktop:py-2 bg-accent desktop:bg-[#fafbfd] flex h-full flex-col gap-3 overflow-y-auto py-4",
        className,
      )}
    >
      {groups.length === 0 && (
        <InfoMessage
          imgSrc="/info/messagesNotFound.svg"
          title="Сообщений пока нет"
          description="Напишите первым :)"
          className="flex-1 justify-center"
        />
      )}
      <div className="mt-auto flex flex-col gap-3">
        {groups.map((group) => (
          <MessageGroup key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};
