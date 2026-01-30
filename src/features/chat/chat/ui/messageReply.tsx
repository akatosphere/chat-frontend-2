import { cn } from "@/shared/shadcn/lib/utils";

import { ReplyBlock } from "../model/messageBlock/types";
import { useMessageNavigation } from "../model/store/useChatNavigationStore";

type MessageReplyProps = {
  className?: string;
  isMine?: boolean;
  message: ReplyBlock;
};

export const MessageReply: React.FC<MessageReplyProps> = ({ className, isMine, message }) => {
  const navigateToMessage = useMessageNavigation((s) => s.navigateToMessage);

  return (
    <div className="px-3 pt-2.5">
      <div
        onClick={() => navigateToMessage(message.messageUid)}
        className={cn(
          "border-primary-secondary flex cursor-pointer flex-col gap-0.5 rounded-sm border-l-4 py-1 pr-2.5 pl-1.5",
          isMine ? "bg-white/50" : "bg-primary-secondary/10",
          className,
        )}
      >
        <span className="text-primary minitext font-medium">{message.authorName}</span>
        <span className="minitext emojis-apple truncate text-black">{message.content}</span>
      </div>
    </div>
  );
};
