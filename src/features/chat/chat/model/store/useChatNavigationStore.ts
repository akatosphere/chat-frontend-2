import { create } from "zustand";

import { searchMessagePosition } from "../../lib/searchMessagePosition";

export const navigateToMessage = async ({
  userUid,
  messageUid,
}: {
  userUid: string;
  messageUid: string;
}) => {
  const result = await searchMessagePosition({
    userUid,
    query: messageUid,
  });

  if (!result.success) {
    return;
  }
  useMessageNavigation.getState().navigate(result.data[0].uid, result.data[0].page);
};

interface ChatNavigationState {
  targetMessageId: string | null;
  targetPage: number | null;
  highlightMessageId: string | null;
  requestId: number;

  navigate: (messageId: string, page: number) => void;
  clearHighlight: () => void;
  reset: () => void;
}

export const useMessageNavigation = create<ChatNavigationState>((set) => ({
  targetMessageId: null,
  targetPage: null,
  highlightMessageId: null,
  requestId: 0,

  navigate: (messageId, page) =>
    set((state) => ({
      targetMessageId: messageId,
      targetPage: page,
      highlightMessageId: messageId,
      requestId: state.requestId + 1,
    })),

  clearHighlight: () =>
    set({
      highlightMessageId: null,
    }),

  reset: () =>
    set({
      targetMessageId: null,
      targetPage: null,
      highlightMessageId: null,
    }),
}));
