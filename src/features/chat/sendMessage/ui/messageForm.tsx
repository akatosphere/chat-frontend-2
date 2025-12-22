"use client";

import AttachBtn from "@icons/chat/attachBtn.svg";
import EmojiBtn from "@icons/chat/emojiBtn.svg";
import MessageSendBtn from "@icons/chat/messageSendBtn.svg";
import VoiceMessage from "@icons/chat/voiceMessage.svg";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/shared/shadcn/ui/input-group";

import { resize } from "../lib/helpers";
import { useMessageForm } from "../lib/useMessageForm";

type MessageFormProps = {
  className?: string;
  onEmojiBtnClick?: () => void;
  onAttachBtnClick?: () => void;
  onSubmitMessage: (message: string) => void;
  isKeyboardOpen: boolean;
};

export const MessageForm: React.FC<MessageFormProps> = ({
  className,
  onEmojiBtnClick,
  onAttachBtnClick,
  onSubmitMessage,
  isKeyboardOpen,
}) => {
  const { textMessage, setTextMessage, textareaRef, handleSubmit, onKeyDown } = useMessageForm({
    onSubmitMessage,
    isKeyboardOpen,
  });

  return (
    <form className={cn("flex items-end py-3", className)} onSubmit={handleSubmit}>
      <div className="flex h-11 flex-1 flex-row-reverse pr-3">
        <Button variant="ghost" size="icon-auto" onClick={onAttachBtnClick} type="button">
          <AttachBtn className="h-11 w-11" />
        </Button>
      </div>

      <InputGroup className="relative flex h-min flex-4 rounded-3xl bg-white">
        <div className="desktop:max-h-[448px] flex max-h-[172px] flex-1 overflow-hidden rounded-3xl">
          <div className="desktop:[&::-webkit-scrollbar]:inline flex flex-1 overflow-y-auto pr-10 [&::-webkit-scrollbar]:hidden">
            <InputGroupTextarea
              ref={textareaRef}
              onInput={resize}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Сообщение"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              className="subtext h-11 min-h-11 resize-none overflow-hidden"
            />
          </div>
        </div>

        <InputGroupAddon align="inline-end" className="absolute right-0 bottom-3 pr-2 pb-0">
          <InputGroupButton
            onClick={onEmojiBtnClick}
            type="button"
            size="icon-auto"
            variant="ghost"
          >
            <EmojiBtn className="h-5 w-5" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="h-11 flex-1 pl-3">
        {textMessage.trim() ? (
          <Button
            variant="ghost"
            size="icon-auto"
            type="submit"
            onMouseDown={(e) => e.preventDefault()}
          >
            <MessageSendBtn className="h-11 w-11" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon-auto" type="button">
            <VoiceMessage className="h-11 w-11" />
          </Button>
        )}
      </div>
    </form>
  );
};
