import { UserStatus } from "./types";

export const STATUS_CONFIG: Record<UserStatus, { label: string; className: string }> = {
  online: {
    label: "в сети",
    className: "text-primary",
  },
  offline: {
    label: "не в сети",
    className: "text-gray",
  },
  connecting: {
    label: "соединение…",
    className: "text-gray",
  },
  typing: {
    label: "печатает…",
    className: "text-primary",
  },
};
