import { StatusIcon } from "@/entities/chat/ui/statusIcon";
import { cn } from "@/shared/shadcn/lib/utils";

import { TextBlock } from "../model/messageBlock/types";
import { SendingStatus } from "../model/types/serverTypes";

type MessageTextProps = {
  className?: string;
  block: TextBlock;
  isMine: boolean;
  time: string;
  status: SendingStatus;
};

export const MessageText: React.FC<MessageTextProps> = ({
  className,
  block,
  isMine,
  time,
  status,
}) => {
  return (
    <div
      className={cn(
        "relative flex h-fit w-full items-stretch justify-between px-3 pt-1.5 pb-2.5",
        className,
      )}
    >
      <p className="subtext emojis-apple min-w-0 pr-2 wrap-break-word whitespace-pre-wrap">
        {block.text}
      </p>
      <div className="flex flex-col justify-end">
        <div className="minitext text-gray leading-subtext mt-auto flex items-center gap-0.5 select-none">
          <span>{time}</span>
          {isMine && <StatusIcon status={status} className="h-2.5 w-3.5" />}
        </div>
      </div>
    </div>
  );
};
