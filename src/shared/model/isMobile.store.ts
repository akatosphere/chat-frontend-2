import { create } from "zustand";

type DeviceState = {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

export const useIsMobileStore = create<DeviceState>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
}));
