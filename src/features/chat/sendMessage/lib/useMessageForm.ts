import { useRef, useState } from "react";

import { resizeTextarea } from "@/shared/form/lib/resizeTextarea";
import { useClickOutside } from "@/shared/lib/useClickOutside";
import { useIsMobileStore } from "@/shared/model/isMobile.store";

type UseMessageFormOptions = {
  onSubmitMessage: (message: string) => void;
  isKeyboardOpen: boolean;
};

export const useMessageForm = ({ onSubmitMessage, isKeyboardOpen }: UseMessageFormOptions) => {
  const [textMessage, setTextMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const emojiBtnRef = useRef<HTMLDivElement>(null);

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
        textareaRef.current?.focus();
      }
      resizeTextarea({
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
      setEmojiPickerOpen(false);
      submitMessage();
    }
  };

  const onToggle = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
    if (!isMobile) textareaRef.current?.focus();
    if (emojiPickerOpen) textareaRef.current?.focus();
  };

  const onEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setTextMessage((prev) => prev + emoji);
      return;
    }

    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textMessage.substring(0, cursorPosition);
    const textAfterCursor = textMessage.substring(cursorPosition);

    setTextMessage(textBeforeCursor + emoji + textAfterCursor);

    setTimeout(() => {
      if (textarea) {
        const newCursorPosition = cursorPosition + emoji.length;
        if (!isMobile) textarea.focus();
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  useClickOutside(pickerRef, () => {
    if (emojiPickerOpen) setEmojiPickerOpen(false);
  }, [emojiBtnRef]);

  return {
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
  };
};
