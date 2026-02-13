export type MessageBlock = ReplyBlock | ForwardedBlock | TextBlock | FileBlock;

export type ReplyBlock = {
  type: "reply";
  messageUid: string;
  authorName: string;
  content: string;
};

export type ForwardedBlock = {
  type: "forwarded";
  authorName: string;
};

export type TextBlock = {
  type: "text";
  text: string;
};

export type FileBlock = {
  type: "file";
  fileName: string;
  url: string;
};
