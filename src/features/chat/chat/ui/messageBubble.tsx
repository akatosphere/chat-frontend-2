import { StatusIcon } from "@/entities/chat/ui/statusIcon";
import { cn } from "@/shared/shadcn/lib/utils";

import { Message } from "../model/types";

type MessageBubbleProps = {
  className?: string;
  chatMessage: Message;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ className, chatMessage }) => {
  const time = chatMessage.createdAt.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex", chatMessage.isMine ? "justify-end" : "justify-start", className)}>
      <div
        className={cn(
          "desktop:max-w-[500px] relative flex w-fit max-w-[83%] min-w-0 items-stretch rounded-2xl px-3 py-2.5",
          chatMessage.isMine
            ? "bg-light-green desktop:bg-light-green rounded-br-sm"
            : "desktop:bg-gray-tone rounded-bl-sm bg-white",
        )}
      >
        {chatMessage.content && (
          <p className="subtext emojis-apple min-w-0 pr-2 wrap-break-word whitespace-pre-wrap">
            {chatMessage.content}
          </p>
        )}

        {/* {chatMessage.files.length > 0 && (
          <div className="">
            <p className="text-xs text-gray-600">
              Файлы: {chatMessage.files.length}
            </p>
          </div>
        )} */}

        <div className={cn("flex h-full flex-col justify-end")}>
          <div className="minitext text-gray leading-subtext mt-auto flex items-center gap-0.5 select-none">
            <span className="">{time}</span>
            {chatMessage.isMine && (
              <StatusIcon status={chatMessage.status} className="h-2.5 w-3.5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
