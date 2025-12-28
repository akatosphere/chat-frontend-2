// src/store/authStore.ts
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,

  setAccessToken: (token: string) => set({ accessToken: token, isAuthenticated: true }),

  clearAccessToken: () => set({ accessToken: null, isAuthenticated: false }),
}));
