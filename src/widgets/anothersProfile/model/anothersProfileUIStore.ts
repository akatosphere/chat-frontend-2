import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AnothersProfileUIState {
  isMainActive: boolean;
  activeSection: "participants" | "media" | "files" | "voices" | "links" | "settings";
  toggleIsMainActive: () => void;
  setActiveSection: (
    section: "participants" | "media" | "files" | "voices" | "links" | "settings",
  ) => void;
  reset: () => void;
}

// Используем каррирование create<T>()(...) для корректной работы типов с middleware
export const useAnothersProfileUIStore = create<AnothersProfileUIState>()(
  devtools(
    (set) => ({
      isMainActive: true,
      activeSection: "participants",

      toggleIsMainActive: () =>
        set(
          (state) => ({ isMainActive: !state.isMainActive }),
          false,
          "toggleIsMainActive", // Название экшена для DevTools
        ),

      setActiveSection: (section) =>
        set(
          { activeSection: section },
          false,
          "setActiveSection", // Название экшена для DevTools
        ),

      reset: () =>
        set(
          { isMainActive: true, activeSection: "participants" },
          false,
          "reset", // Название экшена для DevTools
        ),
    }),
    {
      name: "AnothersProfileUIStore", // Имя стора в панели инструментов
      enabled: process.env.NODE_ENV !== "production", // Включаем только в разработке
    },
  ),
);
