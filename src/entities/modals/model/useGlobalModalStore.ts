import { create } from "zustand";

import { ModalPayloads, ModalType } from "./types";

interface ModalState {
  type: ModalType | null;
  payload?: ModalPayloads[ModalType];
  open: boolean;

  openModal: <T extends ModalType>(type: T, payload: ModalPayloads[T]) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  payload: undefined,
  open: false,

  openModal: (type, payload) => set({ type, payload, open: true }),
  closeModal: () => set({ type: null, payload: undefined, open: false }),
}));
