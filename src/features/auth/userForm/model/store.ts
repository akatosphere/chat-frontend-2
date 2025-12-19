import { create } from "zustand";

interface UserFormState {
  user: {
    firstName: string;
    nickname: string;
  };
  setUser: ({ firstName, nickname }: { firstName: string; nickname: string }) => void;
  reset: () => void;
}

export const useUserFormStore = create<UserFormState>((set) => ({
  user: {
    firstName: "",
    nickname: "",
  },
  setUser: ({ firstName, nickname }) => set({ user: { firstName, nickname } }),
  reset: () => set({ user: { firstName: "", nickname: "" } }),
}));
