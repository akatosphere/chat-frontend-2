import Link from "next/link";
import { LinkIt, urlRegex } from "react-linkify-it";

import { parseInviteUrl } from "@/entities/chat/lib/parseInviteUrl";
import { cn } from "@/shared/shadcn/lib/utils";

import { TextBlock } from "../model/messageBlock/types";
import { SendingStatus } from "../model/types/serverTypes";

const urlComponent = (match: string, key: number) => {
  const inviteData = parseInviteUrl(match);
  if (inviteData) {
    return (
      <Link key={key} href={`/chats/${inviteData.chatKey}?token=${inviteData.token}`}>
        {match}
      </Link>
    );
  }
  return (
    <a key={key} href={match} target="_blank" rel="noopener noreferrer">
      {match}
    </a>
  );
};
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
        "classic-links",
        isEmpty
          ? "absolute right-3 bottom-2"
          : "relative flex h-fit w-full items-stretch justify-between px-3 pb-2.5",
        // Если текст не пустой: убираем pt-1.5 и ставим pt-0, если имя уже заняло место сверху
        !isEmpty && (hasNameAbove ? "pt-0" : "pt-1.5"),
        className,
      )}
    >
      <LinkIt component={urlComponent} regex={urlRegex}>
        <p className="subtext emojis-apple desktop:wrap-break-word min-w-0 pr-2 wrap-anywhere whitespace-pre-wrap">
          {block.text}
        </p>
      </LinkIt>
      <div className="flex flex-col justify-end">
        <MessageTimeAndStatus isMine={isMine} time={time} status={status} isEmpty={isEmpty} />
      </div>
    </div>
  );
};
