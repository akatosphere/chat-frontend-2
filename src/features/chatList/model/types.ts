export type ChatActions = {
  toggleReadStatus: (chatId: number) => void;
  deleteChat: (chatId: number) => void;
  toggleFavorite: (chatId: number, pin: boolean) => void;
  toggleMuteStatus: (chatId: number, mute: boolean) => void;
};
