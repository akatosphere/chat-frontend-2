import { create } from "zustand";

import { Contact } from "./types";

type ContactState = {
  contacts: Contact[];
  count: number;
  isInitialized: boolean;

  // Действия
  setContacts: (contacts: Contact[], count: number) => void;
  addContacts: (contacts: Contact[]) => void; // для пагинации
  updateContact: (uid: string, patch: Partial<Contact>) => void;
  removeContacts: (uids: string[]) => void;
  reset: () => void;
};

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  count: 0,
  isInitialized: false,

  setContacts: (contacts, count) =>
    set({
      contacts,
      count,
      isInitialized: true,
    }),

  addContacts: (newContacts) =>
    set((state) => ({
      // Добавляем только уникальные контакты (защита от дублей при пагинации)
      contacts: [
        ...state.contacts,
        ...newContacts.filter((nc) => !state.contacts.some((sc) => sc.uid === nc.uid)),
      ],
    })),

  updateContact: (uid, patch) =>
    set((state) => ({
      contacts: state.contacts.map((c) => (c.uid === uid ? { ...c, ...patch } : c)),
    })),

  removeContacts: (uids: string[]) =>
    set((state) => {
      const updatedContacts = state.contacts.filter((c) => !uids.includes(c.uid));
      return {
        contacts: updatedContacts,
        count: updatedContacts.length,
      };
    }),

  reset: () => set({ contacts: [], count: 0, isInitialized: false }),
}));
