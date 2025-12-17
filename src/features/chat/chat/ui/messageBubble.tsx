import { cn } from "@/shared/shadcn/lib/utils";
import { Message } from "../model/types";

type MessageBubbleProps = {
  className?: string;
  chatMessage: Message;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  className,
  chatMessage,
}) => {
  const time = chatMessage.createdAt.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusIcon =
    chatMessage.status === "sent"
      ? "✓"
      : chatMessage.status === "delivered"
      ? "✓✓"
      : "✓✓";

  return (
    <div
      className={cn(
        "flex mb-3",
        chatMessage.isMine ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={cn(
          "relative max-w-xs px-3 py-2.5 rounded-2xl flex items-stretch",
          chatMessage.isMine
            ? "bg-light-green rounded-br-sm"
            : "bg-tone-gray rounded-bl-sm"
        )}
      >
        {chatMessage.content && (
          <p className="subtext wrap-break-words pr-2">{chatMessage.content}</p>
        )}

        {chatMessage.files.length > 0 && (
          <div className="mt-2 pr-12">
            <p className="text-xs text-gray-600">
              Файлы: {chatMessage.files.length}
            </p>
          </div>
        )}

        <div className={cn("h-full flex flex-col justify-end")}>
          <div className="mt-auto flex items-center gap-0.5 minitext text-gray">
            <span className="">{time}</span>
            {chatMessage.isMine && <span>{statusIcon}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
