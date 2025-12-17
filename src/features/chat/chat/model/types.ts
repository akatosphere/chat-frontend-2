export type Message = {
  content: string;
  createdAt: Date;
  id: string;
  isMine: boolean;
  files: { url: string; type: "image" | "video" | "file" }[];
  status: "sent" | "delivered" | "seen";
};
