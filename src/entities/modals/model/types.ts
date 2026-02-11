export type ModalPayloads = {
  deleteChat: { chatKey: string };
  deleteMessage: { messageId: string; chatKey: string; chatKeyUser?: string };
  sendImage: { chatKey: string };
  //новые модалки здесь
};

export type ModalType = keyof ModalPayloads;
