"use client";
import { emojisCategories } from "@/features/emojiPicker/model/data";
import { EmojiPickerss } from "@/features/emojiPicker/ui-2/emojiPicker";
import { EmojiCategories } from "@/features/emojiPicker/ui/emojiCategories";
import { EmojiPickers } from "@/features/emojiPicker/ui/emojiPicker";
import { EmojiPicker } from "@/features/emojiPicker/ui/test";
import { useState } from "react";

export default function Test() {
  return (
    <div className="p-20">
      <EmojiPickers />
      <EmojiPickerss />
    </div>
  );
}
