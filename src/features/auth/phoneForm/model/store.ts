import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PhoneState {
  phone: string;
  setPhone: (phone: string) => void;
  reset: () => void;
}

export const usePhoneStore = create<PhoneState>()(
  persist(
    (set) => ({
      phone: "",
      setPhone: (phone: string) => set({ phone }),
      reset: () => set({ phone: "" }),
    }),
    {
      name: "auth-phone-storage",
    }
  )
);
