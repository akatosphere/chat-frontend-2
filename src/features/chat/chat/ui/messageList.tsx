import { cn } from "@/shared/shadcn/lib/utils";
import { Message } from "../model/types";
import { MessageBubble } from "./messageBubble";

type MessageListProps = {
  className?: string;
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = ({
  className,
  messages,
}) => {
  return (
    <div className={cn("flex flex-col gap-4 p-3", className)}>
      {messages.map((message) => {
        return <MessageBubble key={message.id} chatMessage={message} />;
      })}
    </div>
  );
};
