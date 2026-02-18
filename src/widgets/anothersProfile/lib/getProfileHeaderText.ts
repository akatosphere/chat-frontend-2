import { ChatTypeLight } from "@/entities/chat/model/types";

const CHAT_TYPE_LABELS: Record<ChatTypeLight, string> = {
  chat: "Информация",
  channel: "Информация о канале",
  group: "Информация о группе",
};

interface ProfileHeaderTextArgs {
  chatType: ChatTypeLight;
  isMainActive: boolean;
  activeSection: string;
}

export const getProfileHeaderText = ({
  chatType,
  isMainActive,
  activeSection,
}: ProfileHeaderTextArgs): string => {
  if (isMainActive) {
    return CHAT_TYPE_LABELS[chatType];
  }

  return activeSection === "participants" ? "Участники" : "Вложения";
};
