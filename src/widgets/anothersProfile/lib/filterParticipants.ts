import { ChatParticipant } from "@/entities/chat/model/types";

export const filterParticipants = (participants: ChatParticipant[], search: string) => {
  const q = search.trim().toLowerCase();
  // if (!q) return chats;
  return participants.filter((participant) => {
    const { fullName } = participant;
    if (fullName.toLowerCase().includes(q)) return true;
  });
};
