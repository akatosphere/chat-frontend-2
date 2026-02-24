import Close from "@icons/chat/close.svg";
import Image from "next/image";

import { getLastMessagePreview } from "@/entities/chat/lib/getLastMessagePreview";
import { IMAGE_TYPES } from "@/features/chatList/model/constants";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { useChatStore } from "../../../../entities/chat/model/useChatStore";

type ReplyBoxProps = {
  className?: string;
};

export const ReplyBox: React.FC<ReplyBoxProps> = ({ className }) => {
  const { replyTarget, setReplyTarget } = useChatStore();
  const firstImage = replyTarget?.filesList?.find((file) =>
    IMAGE_TYPES.some((t) => t.startsWith(file.fileType || "")),
  )?.fileUrl;

  const caption = getLastMessagePreview({
    content: replyTarget?.content,
    files: {
      count: replyTarget?.filesList.length || 0,
      types:
        replyTarget?.filesList
          .map((file) => file.fileType)
          .filter((t): t is string => Boolean(t)) || [],
    },
  });

  if (!replyTarget) return null;

  return (
    <div
      className={cn(
        "bg-primary-secondary/10 border-primary-secondary w-full border-t px-4 py-1",
        className,
      )}
    >
      <div className="border-primary-secondary flex items-center justify-between border-l-4">
        {firstImage && (
          <Image
            src={firstImage}
            alt="image"
            width={48}
            height={48}
            className="ml-1 h-10 w-10 rounded-md bg-white object-cover"
          />
        )}
        <div className={cn("minitext flex min-w-0 flex-1 flex-col justify-between gap-0.5 pl-1")}>
          <span className="text-primary">
            В ответ на{" "}
            <span className="font-medium">
              {replyTarget.fromUser.lastName
                ? replyTarget.fromUser.firstName + " " + replyTarget.fromUser.lastName
                : replyTarget.fromUser.firstName}
            </span>
          </span>
          <p className="emojis-apple text-gray truncate">{caption.text || replyTarget.content}</p>
        </div>
        <Button
          onClick={() => setReplyTarget(null)}
          variant={"text"}
          size={"inline"}
          className="h-3.5 w-3.5 shrink-0"
        >
          <Close />
        </Button>
      </div>
    </div>
  );
};
