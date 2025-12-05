"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VerificationState {
  attemptsLeft: number;
  banLevel: number;
  resendTimer: number;
  isBanned: boolean;
  isResendAvailable: boolean;

  setAttemptsLeft: (val: number | ((prev: number) => number)) => void;
  setBanLevel: (val: number | ((prev: number) => number)) => void;
  setResendTimer: (val: number | ((prev: number) => number)) => void;
  setIsBanned: (val: boolean) => void;
  setIsResendAvailable: (val: boolean) => void;
}

export const useVerificationStore = create<VerificationState>()(
  persist(
    (set) => ({
      attemptsLeft: 5,
      banLevel: 0,
      resendTimer: 120,
      isBanned: false,
      isResendAvailable: false,

      setAttemptsLeft: (val) =>
        set((state) => ({
          attemptsLeft:
            typeof val === "function" ? val(state.attemptsLeft) : val,
        })),
      setBanLevel: (val) =>
        set((state) => ({
          banLevel: typeof val === "function" ? val(state.banLevel) : val,
        })),
      setResendTimer: (val) =>
        set((state) => {
          const newVal =
            typeof val === "function" ? val(state.resendTimer) : val;
          return { resendTimer: newVal, isResendAvailable: newVal <= 0 };
        }),
      setIsBanned: (val) => set({ isBanned: val }),
      setIsResendAvailable: (val) => set({ isResendAvailable: val }),
    }),
    { name: "auth-storage" }
  )
);
