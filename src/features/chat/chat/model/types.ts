export type MessageStatus = "sent" | "delivered" | "read";

export type MessageFile = {
  id: number;
  file_url: string;
  file_type: string;
};

export type Message = {
  id: number;
  content: string;
  files: MessageFile[];
  createdAt: Date;
  isMine: boolean;
  status: MessageStatus;
};

export type ApiMessage = {
  id: number;
  content: string | null;
  created_at: number;
  from_user: { uid: string };
  files_list: MessageFile[];
  new?: boolean;
};
