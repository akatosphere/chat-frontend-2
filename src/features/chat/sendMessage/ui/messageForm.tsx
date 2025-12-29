"use client";

import AttachBtn from "@icons/chat/attachBtn.svg";
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
import { EmojiPicker } from "@/widgets/emoji-picker/ui/emojiPicker";

import { resize } from "../lib/helpers";
import { useMessageForm } from "../lib/useMessageForm";
import { EmojiBtnToggle } from "./emojiBtnToggle";

type MessageFormProps = {
  className?: string;
  onEmojiBtnClick?: () => void;
  onAttachBtnClick?: () => void;
  onSubmitMessage: (message: string) => void;
  isKeyboardOpen: boolean;
};

export const MessageForm: React.FC<MessageFormProps> = ({
  className,
  onAttachBtnClick,
  onSubmitMessage,
  isKeyboardOpen,
}) => {
  const {
    textMessage,
    setTextMessage,
    textareaRef,
    handleSubmit,
    onKeyDown,
    emojiPickerOpen,
    setEmojiPickerOpen,
    onToggle,
    onEmojiSelect,
    pickerRef,
    emojiBtnRef,
  } = useMessageForm({
    onSubmitMessage,
    isKeyboardOpen,
  });

  return (
    <div className="relative w-full">
      <form className={cn("relative flex items-end px-4 py-3", className)} onSubmit={handleSubmit}>
        <div className="flex h-11 flex-row-reverse pr-3">
          <Button variant="ghost" size="icon-auto" onClick={onAttachBtnClick} type="button">
            <AttachBtn className="h-11 w-11" />
          </Button>
        </div>

        <InputGroup className="relative flex h-min w-full rounded-3xl bg-white">
          <div className="reletive desktop:max-h-[448px] flex max-h-[172px] flex-1 overflow-hidden rounded-3xl">
            <div className="desktop:[&::-webkit-scrollbar]:inline flex flex-1 overflow-y-auto pr-10 [&::-webkit-scrollbar]:hidden">
              <InputGroupTextarea
                ref={textareaRef}
                onInput={resize}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Сообщение"
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                className="subtext emojis-apple h-11 min-h-11 resize-none overflow-hidden"
              />
            </div>
            {emojiPickerOpen && (
              <div
                ref={pickerRef}
                className="desktop:right-0 desktop:left-auto desktop:translate-x-0 absolute bottom-18 left-1/2 -translate-x-1/2 transform"
              >
                <EmojiPicker onEmojiSelect={onEmojiSelect} />
              </div>
            )}
          </div>

          <InputGroupAddon
            ref={emojiBtnRef}
            align="inline-end"
            className="absolute right-0 bottom-3 pr-2 pb-0"
          >
            <InputGroupButton
              onClick={(e) => {
                e.stopPropagation();
                setEmojiPickerOpen(!emojiPickerOpen);
              }}
              type="button"
              size="icon-auto"
              variant="ghost"
              asChild
            >
              <EmojiBtnToggle className="h-5 w-5" pressed={emojiPickerOpen} onToggle={onToggle} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <div className="h-11 pl-3">
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
    </div>
  );
};
