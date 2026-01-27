import { MappedChatMessage } from "./mappedTypes";

export type MessageGroupType = {
  id: string;
  date: string;
  label: string;
  messages: MappedChatMessage[];
};
