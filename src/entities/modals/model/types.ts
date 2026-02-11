export type ModalPayloads = {
  clearChat: { chatKey: string };
  deleteMessage: { messageId: string; chatKey: string; chatKeyUser?: string };
  //новые модалки здесь
};

export type ModalType = keyof ModalPayloads;
