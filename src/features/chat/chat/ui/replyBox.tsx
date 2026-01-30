import Close from "@icons/chat/close.svg";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { useChatStore } from "../model/store/useChatStore";

type ReplyBoxProps = {
  className?: string;
};

export const ReplyBox: React.FC<ReplyBoxProps> = ({ className }) => {
  const { replyTarget, setReplyTarget } = useChatStore();

  if (!replyTarget) return null;

  return (
    <div className={cn("bg-primary-secondary/10 w-full px-4 py-1", className)}>
      <div className="border-primary-secondary flex items-center justify-between gap-2.5 border-l-4">
        <div className="flex min-w-0 flex-1 flex-col pl-1">
          <span className="text-primary">
            В ответ на{" "}
            <span className="font-medium">
              {replyTarget.fromUser.lastName
                ? replyTarget.fromUser.firstName + " " + replyTarget.fromUser.lastName
                : replyTarget.fromUser.firstName}
            </span>
          </span>
          <p className="emojis-apple truncate text-black">{replyTarget.content}</p>
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
