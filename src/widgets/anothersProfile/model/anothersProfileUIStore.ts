import { create } from "zustand";

interface AnothersProfileUIState {
  isMainActive: boolean;
  activeSection: "participants" | "media" | "files" | "voices" | "links";
  toggleIsMainActive: () => void;
  setActiveSection: (section: "participants" | "media" | "files" | "voices" | "links") => void;
  reset: () => void;
}

export const useAnothersProfileUIStore = create<AnothersProfileUIState>((set) => ({
  isMainActive: true,
  activeSection: "participants",
  toggleIsMainActive: () => set((state) => ({ isMainActive: !state.isMainActive })),
  setActiveSection: (section) => set({ activeSection: section }),
  reset: () => set({ isMainActive: true, activeSection: "participants" }),
}));
