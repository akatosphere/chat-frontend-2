import { create } from "zustand";

import { ChatType } from "./types";

interface CreateChatState {
  step: 1 | 2;
  groupOrChannel: "group" | "channel";
  formData: {
    name: string;
    description: string;
    chat_type: ChatType;
    avatar: string | null;
    uid_users_list: string[];
  };
  setStep: (step: 1 | 2) => void;
  setGroupOrChannel: (groupOrChannel: "group" | "channel") => void;
  updateData: (data: Partial<CreateChatState["formData"]>) => void;
  reset: () => void;
}

export const useCreateChatStore = create<CreateChatState>((set) => ({
  step: 1,
  groupOrChannel: "group",
  formData: {
    name: "",
    description: "",
    chat_type: "private-group",
    avatar: null,
    uid_users_list: [],
  },
  setStep: (step) => set({ step }),
  setGroupOrChannel: (groupOrChannel) => set({ groupOrChannel }),
  updateData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  reset: () =>
    set({
      step: 1,
      formData: {
        name: "",
        description: "",
        chat_type: "private-group",
        avatar: null,
        uid_users_list: [],
      },
    }),
}));
