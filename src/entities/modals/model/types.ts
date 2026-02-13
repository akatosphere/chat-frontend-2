export type ModalPayloads = {
  clearChat: { chatKey: string };
  deleteMessage: { messageId: string; chatKey: string; chatKeyUser?: string };
  leaveChat: {
    chatName: string;
    modalVariant: "channel" | "public-group" | "private-group";
    onConfirm: () => void;
  };
  deleteChatGlobal: {
    chatName: string;
    modalVariant: "group" | "channel";
    onConfirm: () => void;
  };
  //новые модалки здесь
};

export type ModalType = keyof ModalPayloads;
