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
  hasNameAbove?: boolean; // Добавили проп для отслеживания имени сверху
};

export const MessageText: React.FC<MessageTextProps> = ({
  className,
  block,
  isMine,
  time,
  status,
  hasNameAbove,
}) => {
  const isEmpty = block.text.trim() === "";

  return (
    <div
      className={cn(
        isEmpty
          ? "absolute right-3 bottom-2"
          : "relative flex h-fit w-full items-stretch justify-between px-3 pb-2.5",
        // Если текст не пустой: убираем pt-1.5 и ставим pt-0, если имя уже заняло место сверху
        !isEmpty && (hasNameAbove ? "pt-0" : "pt-1.5"),
        className,
      )}
    >
      <p className="subtext emojis-apple min-w-0 pr-2 break-all whitespace-pre-wrap">
        {block.text}
      </p>
      <div className="flex flex-col justify-end">
        <div
          className={cn(
            "minitext text-gray leading-subtext mt-auto flex items-center gap-0.5 select-none",
            isEmpty && "rounded-full bg-[#00000066] px-1.5 py-0.5 text-white",
          )}
        >
          <span>{time}</span>
          {isMine && <StatusIcon status={status} className="h-2.5 w-3.5" isActive={isEmpty} />}
        </div>
      </div>
    </div>
  );
};
