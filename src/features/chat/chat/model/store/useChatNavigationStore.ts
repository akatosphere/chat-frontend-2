import { create } from "zustand";

interface MessageNavigationState {
  targetMessageId: string | null;
  highlightMessageId: string | null;
  requestId: number;

  navigateToMessage: (id: string) => void;
  clearHighlight: () => void;
}

export const useMessageNavigation = create<MessageNavigationState>((set) => ({
  targetMessageId: null,
  highlightMessageId: null,
  requestId: 0,

  navigateToMessage: (id) =>
    set((state) => ({
      targetMessageId: id,
      highlightMessageId: id,
      requestId: state.requestId + 1,
    })),

  clearHighlight: () =>
    set({
      highlightMessageId: null,
    }),
}));
