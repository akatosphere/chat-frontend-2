export type ModalPayloads = {
  deleteChat: { chatKey: string };
  deleteMessage: { messageId: string; chatKey: string; chatKeyUser?: string };
  sendImage: { chatKey: string };
  sendFile: { chatKey: string };
  forward: { messageId: string; chatKey: string };
  //новые модалки здесь
};

export type ModalType = keyof ModalPayloads;
