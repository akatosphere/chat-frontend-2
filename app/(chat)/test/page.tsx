"use client";
import { useRef, useState } from "react";

import { Textarea } from "@/shared/shadcn/ui/textarea";
import { EmojiPicker } from "@/widgets/emoji-picker/ui/emojiPicker";

export default function Test() {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setMessage((prev) => prev + emoji);
      return;
    }

    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = message.substring(0, cursorPosition);
    const textAfterCursor = message.substring(cursorPosition);

    setMessage(textBeforeCursor + emoji + textAfterCursor);

    setTimeout(() => {
      if (textarea) {
        const newCursorPosition = cursorPosition + emoji.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };
  return (
    <div className="p-20">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="emojis"
      />
      <EmojiPicker onEmojiSelect={onEmojiSelect} />
    </div>
  );
}
