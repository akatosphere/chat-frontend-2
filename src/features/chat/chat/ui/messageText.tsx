import { cn } from "@/shared/shadcn/lib/utils";

import { TextBlock } from "../model/messageBlock/types";
import { SendingStatus } from "../model/types/serverTypes";
import { MessageTimeAndStatus } from "./messageTimeAndStatus";

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
  if (!block.text) return null;
  const isEmpty = block.text.trim() === "";
  if (isEmpty) return null;
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
      <p className="subtext emojis-apple desktop:wrap-break-word min-w-0 pr-2 wrap-anywhere whitespace-pre-wrap">
        {block.text}
      </p>
      <div className="flex flex-col justify-end">
        <MessageTimeAndStatus isMine={isMine} time={time} status={status} isEmpty={isEmpty} />
      </div>
    </div>
  );
};
