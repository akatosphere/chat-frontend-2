// src/store/authStore.ts
import { create } from "zustand";

import { saveTokenToCookie } from "./actions/saveTokenToCookie";

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean;
  setAccessToken: (token: string) => void;
  syncToken: (token: string) => void;
  clearAccessToken: () => void;
  finishInitialization: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isInitialized: false,
  setAccessToken: (token) => {
    set({ accessToken: token });
    saveTokenToCookie(token).catch((err) => {
      console.error("Failed to sync token with cookies", err);
    });
  },
  syncToken: (token) => {
    set({ accessToken: token });
  },
  clearAccessToken: () => set({ accessToken: null }),
  finishInitialization: () => set({ isInitialized: true }),
}));
