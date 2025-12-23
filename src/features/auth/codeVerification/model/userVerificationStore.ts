import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VerificationState {
  attemptsLeft: number;
  banLevel: number;
  lastResendAt: number | null;
  banUntil: number;

  resendTimer: number;
  isResendAvailable: boolean;
  isBanned: boolean;
  isCodeExpired: boolean;

  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  setAttemptsLeft: (fn: (prev: number) => number) => void;
  setBanLevel: (level: number) => void;
  setLastResendAt: (time: number) => void;
  setBanUntil: (time: number) => void;
  setResendTimer: (value: number) => void;
  setIsResendAvailable: (value: boolean) => void;
  setIsBanned: (value: boolean) => void;
  setIsCodeExpired: (v: boolean) => void;
  resetVerification: () => void;
}

export const useVerificationStore = create<VerificationState>()(
  persist(
    (set) => ({
      attemptsLeft: 5,
      banLevel: 0,
      lastResendAt: null,
      banUntil: 0,

      resendTimer: 0,
      isResendAvailable: true,
      isBanned: false,
      isCodeExpired: false,

      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      setAttemptsLeft: (fn) => set((state) => ({ attemptsLeft: fn(state.attemptsLeft) })),
      setBanLevel: (level) => set({ banLevel: level }),
      setLastResendAt: (time) => set({ lastResendAt: time }),
      setBanUntil: (time) => set({ banUntil: time }),
      setIsCodeExpired: (v) => set({ isCodeExpired: v }),
      setResendTimer: (value) => set({ resendTimer: value }),
      setIsResendAvailable: (value) => set({ isResendAvailable: value }),
      setIsBanned: (value) => set({ isBanned: value }),

      resetVerification: () =>
        set({
          attemptsLeft: 5,
          banLevel: 0,
          lastResendAt: null,
          banUntil: 0,
          resendTimer: 0,
          isCodeExpired: false,
          isResendAvailable: true,
          isBanned: false,
        }),
    }),
    {
      name: "verification-storage",
      partialize: (state) => ({
        attemptsLeft: state.attemptsLeft,
        banLevel: state.banLevel,
        lastResendAt: state.lastResendAt,
        banUntil: state.banUntil,
        isCodeExpired: state.isCodeExpired,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
