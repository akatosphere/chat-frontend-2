import { UserStatus } from "./types";

export const STATUS_CONFIG: Record<UserStatus, { label: string; className: string }> = {
  online: {
    label: "В сети",
    className: "text-primary",
  },
  offline: {
    label: "Не в сети",
    className: "text-gray",
  },
  connecting: {
    label: "Соединение…",
    className: "text-gray",
  },
  typing: {
    label: "Печатает…",
    className: "text-primary",
  },
};
