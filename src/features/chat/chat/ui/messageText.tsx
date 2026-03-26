import { cn } from "@/shared/shadcn/lib/utils";

import { TextBlock } from "../model/messageBlock/types";
import { useMessageNavigation } from "../model/store/useChatNavigationStore";
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
  const searchQuery = useMessageNavigation((s) => s.searchQuery);
  const highlightText = (text: string, query?: string | null) => {
    if (!query) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <span className="text-[#0079ff]">{match}</span>
        {after}
      </>
    );
  };
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
        {highlightText(block.text, searchQuery)}
      </p>
      <div className="flex flex-col justify-end">
        <MessageTimeAndStatus isMine={isMine} time={time} status={status} isEmpty={isEmpty} />
      </div>
    </div>
  );
};
