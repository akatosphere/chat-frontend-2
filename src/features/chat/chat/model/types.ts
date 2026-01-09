export type MessageStatus = "sent" | "delivered" | "read";
export type User = {
  uid: string;
  username: string;
  avatarUrl: string;
  nickname: string;
  firstName: string;
  lastName: string;
};

export type FileAttachment = {
  id: number;
  url: string;
  webpUrl?: string;
  type: string;
};

export type Message = {
  id: number;
  uid: string;
  author: User;
  content: string;
  files: FileAttachment[];
  createdAt: Date;
  isMine: boolean;
  status: MessageStatus;
  replyTo?: Message[];
  forwardedFrom?: User;
};

export type MessageGroupType = {
  id: string;
  date: string;
  label: string;
  messages: Message[];
};
