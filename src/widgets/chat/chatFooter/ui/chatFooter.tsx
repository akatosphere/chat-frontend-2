"use client";

import { useChatStore } from "@/entities/chat/model/useChatStore";
import { ForwardBox } from "@/features/chat/chat/ui/forwardBox";
import { ReplyBox } from "@/features/chat/chat/ui/replyBox";
import { SelectBox } from "@/features/chat/chat/ui/selectBox";
import { MessageForm } from "@/features/chat/sendMessage/ui/messageForm";
import { useKeyboardOffset } from "@/shared/lib/useKeyboardOffset";
import { cn } from "@/shared/shadcn/lib/utils";

type ChatFooterProps = {
  className?: string;
  onSendMessage: (message: string) => void;
};

export const ChatFooter: React.FC<ChatFooterProps> = ({ className, onSendMessage }) => {
  const { isKeyboardOpen } = useKeyboardOffset();

  const { isSelectionMode, forwardTargets } = useChatStore();

  return (
    <>
      <ReplyBox />
      <ForwardBox />
      <footer
        style={{ paddingBottom: "var(--keyboard-offset)" }}
        className={cn(
          "bg-primary-gray/90 desktop:bg-main-light-gray border-muted w-full shrink-0 border-t",
          className,
        )}
      >
        {isSelectionMode ? (
          <SelectBox />
        ) : (
          <MessageForm
            isKeyboardOpen={isKeyboardOpen}
            onSubmitMessage={onSendMessage}
            isAbleToSendWithoutText={forwardTargets.length > 0}
          />
        )}
      </footer>
    </>
  );
};
