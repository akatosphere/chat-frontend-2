import { create } from "zustand";

type MainContentState = {
  shouldShowDefault: boolean;
  setShouldShowDefault: (value: boolean) => void;
};

export const useMainContentStore = create<MainContentState>((set) => ({
  shouldShowDefault: false,
  setShouldShowDefault: (value) => set({ shouldShowDefault: value }),
}));
