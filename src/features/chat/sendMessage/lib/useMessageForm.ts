import { useRef, useState } from "react";

import { useIsMobileStore } from "@/shared/model/isMobile.store";

import { resize } from "./helpers";

type UseMessageFormOptions = {
  onSubmitMessage: (message: string) => void;
  isKeyboardOpen: boolean;
};

export const useMessageForm = ({ onSubmitMessage, isKeyboardOpen }: UseMessageFormOptions) => {
  const [textMessage, setTextMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isMobile = useIsMobileStore((state) => state.isMobile);

  const submitMessage = () => {
    const trimmedMessage = textMessage.trim();
    if (!trimmedMessage) return;

    if (isMobile && !isKeyboardOpen) {
      textareaRef.current?.blur();
    }

    onSubmitMessage(trimmedMessage);
    setTextMessage("");

    requestAnimationFrame(() => {
      if (!isMobile || isKeyboardOpen) {
        console.log(isKeyboardOpen);
        textareaRef.current?.focus();
      }
      resize({
        currentTarget: textareaRef.current,
      } as React.FormEvent<HTMLTextAreaElement>);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      e.preventDefault();
      submitMessage();
    }
  };

  const onToggle = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
    if (!isMobile) textareaRef.current?.focus();
    if (emojiPickerOpen) textareaRef.current?.focus();
  };

  return {
    textMessage,
    setTextMessage,
    textareaRef,
    handleSubmit,
    onKeyDown,
    emojiPickerOpen,
    setEmojiPickerOpen,
    onToggle,
  };
};
