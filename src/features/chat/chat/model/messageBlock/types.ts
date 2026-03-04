import { FileItem, MediaItem } from "@/shared/ui/mediaGrid/mediaGrid";

export type MessageBlock = ReplyBlock | ForwardedBlock | TextBlock | FileBlock | MediaBlock;

export type ReplyBlock = {
  type: "reply";
  messageUid: string;
  authorName: string;
  content: string;
};

export type ForwardedBlock = {
  type: "forwarded";
  authorName: string;
  chatKey: string;
  content: string;
  avatarUrl: string;
};

export type TextBlock = {
  type: "text";
  text: string;
};

export type FileBlock = {
  type: "file";
  items: FileItem[];
};

export type MediaBlock = {
  type: "media";
  items: MediaItem[];
};
