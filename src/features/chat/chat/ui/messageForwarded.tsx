import Link from "next/link";

import { Avatar } from "@/entities/chat/ui/avatar";
import { cn } from "@/shared/shadcn/lib/utils";

import { ForwardedBlock } from "../model/messageBlock/types";

type MessageForwardedProps = {
  className?: string;
  message: ForwardedBlock;
};

export const MessageForwarded: React.FC<MessageForwardedProps> = ({ className, message }) => {
  return (
    <div className={cn("px-3 pt-2.5", className)}>
      <div className="cursor-pointer truncate">
        <span className="text-primary-secondary minitext">Переслано от</span>
        <Link href={`/chats/${message.chatKey}`} className="flex h-4.5 gap-1">
          <Avatar size="xs" avatarUrl={message.avatarUrl} />
          <span className="text-primary minitext self-center leading-4 font-medium">
            {message.authorName}
          </span>
        </Link>
        <p className="mt-1.5 text-black">{message.content}</p>
      </div>
    </div>
  );
};
