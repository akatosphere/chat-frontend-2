import { create } from "zustand";

import { ChatParticipant } from "./types";

type ParticipantsState = {
  participants: ChatParticipant[];
  count: number;
  isInitialized: boolean;

  // Действия
  setParticipants: (participants: ChatParticipant[], count: number) => void;
  addParticipants: (participants: ChatParticipant[]) => void; // для пагинации
  updateParticipant: (uid: string, patch: Partial<ChatParticipant>) => void;
  removeParticipants: (uids: string[]) => void;
  reset: () => void;
};

export const useParticipantsStore = create<ParticipantsState>((set) => ({
  participants: [],
  count: 0,
  isInitialized: false,

  setParticipants: (participants, count) =>
    set({
      participants,
      count,
      isInitialized: true,
    }),

  addParticipants: (newParticipants) =>
    set((state) => ({
      // Добавляем только уникальные контакты (защита от дублей при пагинации)
      participants: [
        ...state.participants,
        ...newParticipants.filter((nc) => !state.participants.some((sc) => sc.uid === nc.uid)),
      ],
    })),

  updateParticipant: (uid, patch) =>
    set((state) => ({
      participants: state.participants.map((c) => (c.uid === uid ? { ...c, ...patch } : c)),
    })),

  removeParticipants: (uids: string[]) =>
    set((state) => {
      const updatedParticipants = state.participants.filter((c) => !uids.includes(c.uid));
      return {
        participants: updatedParticipants,
        count: updatedParticipants.length,
      };
    }),

  reset: () => set({ participants: [], count: 0, isInitialized: false }),
}));
