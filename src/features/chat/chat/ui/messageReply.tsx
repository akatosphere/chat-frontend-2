import Image from "next/image";

import { getLastMessagePreview } from "@/entities/chat/lib/getLastMessagePreview";
import { IMAGE_TYPES } from "@/features/chatList/model/constants";
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
  const firstImage = message.filesList.find((file) =>
    IMAGE_TYPES.some((t) => t.startsWith(file.fileType)),
  )?.fileUrl;

  const caption = getLastMessagePreview({
    content: message.content,
    files: {
      count: message.filesList.length,
      types: message.filesList.map((file) => file.fileType) || [],
    },
  });

  return (
    <div className="px-3 pt-2.5">
      <div
        className={cn(
          "border-primary-secondary flex cursor-pointer rounded-sm border-l-4 py-1 pr-2.5 pl-1.5",
          isMine ? "bg-white/50" : "bg-primary-secondary/10",
          className,
        )}
        onClick={() => navigateToMessage(message.messageUid)}
      >
        {firstImage && (
          <Image
            src={firstImage}
            alt="image"
            width={48}
            height={48}
            className="mr-1 h-10 w-10 rounded-sm"
          />
        )}
        <div className={cn("flex min-w-0 cursor-pointer flex-col gap-0.5")}>
          <span className="text-primary minitext truncate font-medium">{message.authorName}</span>
          <span className="minitext emojis-apple text-gray truncate">
            {caption.text || message.content}
          </span>
        </div>
      </div>
    </div>
  );
};
