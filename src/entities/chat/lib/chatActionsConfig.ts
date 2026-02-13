export type ChatKind =
  | "public-group"
  | "private-group"
  | "public-channel"
  | "private-channel"
  | "chat";

export const isGroup = (chat?: ChatKind) => chat === "public-group" || chat === "private-group";

export const isChannel = (chat?: ChatKind) =>
  chat === "public-channel" || chat === "private-channel";

export const isDialog = (chat?: ChatKind) => chat === "chat";

export type ChatAction = {
  key: string;
  label: string;
  variant?: "primary" | "destructive" | "ghost";
  showForOwners?: boolean;
  showForNonOwners?: boolean;
};

export const CHAT_ACTIONS: Record<string, ChatAction[]> = {
  "public-group": [
    {
      key: "addMember",
      label: "Добавить участника",
      variant: "primary",
      showForOwners: true,
    },
    {
      key: "leaveGroup",
      label: "Покинуть группу",
      variant: "destructive",
      showForNonOwners: true,
    },
  ],

  "private-group": [
    {
      key: "addMember",
      label: "Добавить участника",
      variant: "primary",
      showForOwners: true,
    },
    {
      key: "leaveGroup",
      label: "Покинуть группу",
      variant: "destructive",
      showForNonOwners: true,
    },
  ],

  "public-channel": [
    {
      key: "inviteSubscribers",
      label: "Пригласить подписчиков",
      variant: "primary",
      showForOwners: true,
    },
    {
      key: "unsubscribe",
      label: "Отписаться",
      variant: "destructive",
      showForNonOwners: true,
    },
  ],

  "private-channel": [
    {
      key: "inviteSubscribers",
      label: "Пригласить подписчиков",
      variant: "primary",
      showForOwners: true,
    },
    {
      key: "unsubscribe",
      label: "Отписаться",
      variant: "destructive",
      showForNonOwners: true,
    },
  ],

  chat: [
    {
      key: "addContact",
      label: "Добавить в контакты",
      variant: "primary",
      showForOwners: true,
    },
    {
      key: "block",
      label: "Заблокировать",
      variant: "destructive",
      showForOwners: true,
    },
  ],
};
