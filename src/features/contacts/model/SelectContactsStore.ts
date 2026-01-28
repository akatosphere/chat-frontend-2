import { create } from "zustand";

import { Contact } from "@/entities/contact/model/types";

type SelectContactsStoreState = {
  isSelecting: boolean;
  selected: Contact[]; // Используем camelCase для свойств (selected вместо Selected)

  // Методы управления режимом
  setIsSelecting: (value: boolean) => void;
  toggleIsSelecting: () => void;

  // Методы управления выбором
  addContact: (contact: Contact) => void;
  removeContact: (uid: string) => void;
  toggleContact: (contact: Contact) => void;
  clearSelected: () => void;

  // Полный сброс (и режима, и выбора)
  reset: () => void;
};

export const useSelectContactsStore = create<SelectContactsStoreState>((set) => ({
  isSelecting: false,
  selected: [],

  setIsSelecting: (value) => set({ isSelecting: value }),

  toggleIsSelecting: () =>
    set((state) => ({
      isSelecting: !state.isSelecting,
      // При выходе из режима выбора обычно логично очистить массив
      selected: !state.isSelecting ? state.selected : [],
    })),

  addContact: (contact) =>
    set((state) => ({
      // Добавляем, только если его еще нет в списке
      selected: state.selected.some((c) => c.uid === contact.uid)
        ? state.selected
        : [...state.selected, contact],
    })),

  removeContact: (uid) =>
    set((state) => ({
      selected: state.selected.filter((c) => c.uid !== uid),
    })),

  toggleContact: (contact) =>
    set((state) => {
      const isAlreadySelected = state.selected.some((c) => c.uid === contact.uid);
      if (isAlreadySelected) {
        return { selected: state.selected.filter((c) => c.uid !== contact.uid) };
      }
      return { selected: [...state.selected, contact] };
    }),

  clearSelected: () => set({ selected: [] }),

  reset: () => set({ isSelecting: false, selected: [] }),
}));
