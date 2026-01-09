// src/store/authStore.ts
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  finishInitialization: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isInitialized: false,
  setAccessToken: (token: string) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  finishInitialization: () => set({ isInitialized: true }),
}));
