import { create } from "zustand";

type MediaViewerState = {
  isOpen: boolean;
  messageUid: number | null;
  mediaIndex: number;

  open: (payload: { messageUid: number; mediaIndex: number }) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

export const useMediaViewerStore = create<MediaViewerState>((set) => ({
  isOpen: false,
  messageUid: null,
  mediaIndex: 0,

  open: ({ messageUid, mediaIndex }) => set({ isOpen: true, messageUid, mediaIndex }),

  close: () => set({ isOpen: false, messageUid: null, mediaIndex: 0 }),

  next: () => set((s) => ({ mediaIndex: s.mediaIndex + 1 })),

  prev: () => set((s) => ({ mediaIndex: Math.max(0, s.mediaIndex - 1) })),
}));
