import { create } from "zustand";

type SidebarSection = "/chats" | "/contacts" | "/services" | "/settings";

type SidebarStore = {
  activeSidebarSection: SidebarSection;
  setActiveSidebarSection: (section: SidebarSection) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  activeSidebarSection: "/chats",
  setActiveSidebarSection: (section) => set({ activeSidebarSection: section }),
}));
