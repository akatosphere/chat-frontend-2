import { create } from "zustand";

import { MappedChatMessage, MappedMessageFile } from "@/features/chat/chat/model/types/mappedTypes";
import { MESSAGE_STATUS } from "@/shared/constants/constants";

import { getChatMedia } from "../api/getChatMedia";
import { ChatType } from "./types";

interface ChatState {
  messages: MappedChatMessage[];
  media: MappedMessageFile[];
  isLoadingMedia: boolean;
  isMediaLoaded: boolean; // Флаг для кэширования
  currentUserId: string | null;
  chatKey: string | null;
  chatType: ChatType | null;
  createdBy: string | null;
  isReady: boolean;
  isHide: boolean;
  chatKeyUser: string | null;
  replyTarget: MappedChatMessage | null;
  forwardTarget: MappedChatMessage | null;
  isSelectionMode: boolean;
  selectedMessageUids: Set<string>;

  setReplyTarget: (message: MappedChatMessage | null) => void;
  setForwardTarget: (message: MappedChatMessage | null) => void;
  enterSelectionMode: (uid?: string) => void;
  toggleMessageSelection: (uid: string) => void;
  exitSelectionMode: () => void;
  deleteMessage: (uid: string) => void;
  setInitialData: (
    messages: MappedChatMessage[],
    currentUserId: string,
    chatKey: string,
    chatType: ChatType,
    createdBy?: string,
    chatKeyUser?: string | null,
  ) => void;
  addMessage: (message: MappedChatMessage) => void;
  fetchMedia: (chatKey: string) => Promise<void>;
  addMediaItem: (message: MappedChatMessage) => void;
  updateMessageStatus: (uid: string, status: MappedChatMessage["status"]) => void;
  markAsRead: (uid: string) => void;
  setFailedStatus: (requestUid: string) => void;
  clearMessages: () => void;
  clearMedia: () => void;
  reset: () => void;
}

const initialState = {
  messages: [],
  media: [],
  isLoadingMedia: false,
  isMediaLoaded: false,
  currentUserId: null,
  chatKey: null,
  chatType: null,
  createdBy: null,
  isReady: false,
  isHide: false,
  chatKeyUser: null,
  replyTarget: null,
  forwardTarget: null,
  isSelectionMode: false,
  selectedMessageUids: new Set<string>(),
};

export const useChatStore = create<ChatState>((set, get) => ({
  ...initialState,

  enterSelectionMode: (uid) =>
    set({
      isSelectionMode: true,
      selectedMessageUids: uid ? new Set([uid]) : new Set(),
    }),

  toggleMessageSelection: (uid) =>
    set((state) => {
      const next = new Set(state.selectedMessageUids);
      if (next.has(uid)) {
        next.delete(uid);
      } else {
        next.add(uid);
      }
      return {
        selectedMessageUids: next,
        isSelectionMode: next.size > 0,
      };
    }),

  exitSelectionMode: () => set({ isSelectionMode: false, selectedMessageUids: new Set() }),

  setInitialData: (messages, currentUserId, chatKey, chatType, createdBy, chatKeyUser) => {
    // При смене чата обязательно сбрасываем флаг загрузки медиа
    set({
      messages,
      currentUserId,
      chatKey,
      chatType,
      createdBy,
      chatKeyUser,
      isReady: true,
      isMediaLoaded: false,
      media: [],
    });
  },

  setReplyTarget: (message) => set({ replyTarget: message }),
  setForwardTarget: (message) => set({ forwardTarget: message }),

  deleteMessage: (uid: string) => {
    set((state) => {
      const messageToDelete = state.messages.find((m) => m.uid === uid);
      const fileUidsToRemove = new Set(messageToDelete?.filesList?.map((f) => f.uid) || []);

      return {
        messages: state.messages.filter((msg) => msg.uid !== uid),
        media: state.media.filter((file) => !fileUidsToRemove.has(file.uid)),
      };
    });
  },

  fetchMedia: async (chatKey: string) => {
    if (!chatKey) return;
    set({ isLoadingMedia: true });
    try {
      const data = await getChatMedia(chatKey);

      const imagesOnly = (data as unknown as Record<string, unknown>[])
        .filter((file) => {
          const type = (file.file_type || file.fileType) as string | undefined;
          return type?.startsWith("image/");
        })
        .map((file) => ({
          ...file,
          fileType: (file.file_type || file.fileType) as string,
          fileUrl: (file.file_url || file.fileUrl) as string,
        })) as unknown as MappedMessageFile[];

      set({ media: imagesOnly, isLoadingMedia: false, isMediaLoaded: true });
    } catch {
      set({ isLoadingMedia: false, isMediaLoaded: false });
    }
  },

  addMediaItem: (message: MappedChatMessage) => {
    if (!message.filesList || message.filesList.length === 0) return;

    const rawFiles = message.filesList as unknown as Record<string, unknown>[];

    const newImages = rawFiles.filter((file) => {
      const type = (file.file_type || file.fileType) as string | undefined;
      return type?.startsWith("image/");
    });

    if (newImages.length === 0) return;

    set((state) => {
      const currentUids = new Set(state.media.map((f) => f.uid));

      const uniqueNewImages = newImages
        .filter((f) => !currentUids.has(f.uid as string))
        .map((f) => ({
          ...f,
          fileType: (f.file_type || f.fileType) as string,
          fileUrl: (f.file_url || f.fileUrl) as string,
        })) as unknown as MappedMessageFile[];

      if (uniqueNewImages.length === 0) return state;
      return { media: [...uniqueNewImages, ...state.media] };
    });
  },

  addMessage: (message: MappedChatMessage) => {
    set((state) => {
      const index = state.messages.findIndex(
        (msg) =>
          msg.uid === message.uid || (message.requestUid && msg.requestUid === message.requestUid),
      );

      if (index !== -1) {
        const updated = [...state.messages];
        updated[index] = message;
        return { messages: updated };
      }

      return { messages: [...state.messages, message] };
    });

    get().addMediaItem(message);
  },

  updateMessageStatus: (uid, status) => {
    set((state) => ({
      messages: state.messages.map((msg) => (msg.uid === uid ? { ...msg, status } : msg)),
    }));
  },

  markAsRead: (uid) => {
    set((state) => ({
      messages: state.messages.map((msg) => (msg.uid === uid ? { ...msg, isNew: false } : msg)),
    }));
  },

  setFailedStatus: (requestUid) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.requestUid === requestUid ? { ...msg, status: MESSAGE_STATUS.FAILED } : msg,
      ),
    }));
  },

  clearMessages: () => set({ messages: [], replyTarget: null, forwardTarget: null }),

  clearMedia: () => set({ media: [], isLoadingMedia: false, isMediaLoaded: false }),
  reset: () => set(initialState),
}));
