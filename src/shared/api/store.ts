// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

import api from "./apiClient";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string | null) => void;
  logout: () => void;
  _updateToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      accessToken: null,
      isAuthenticated: false,

      setAccessToken: (token) => {
        set({
          accessToken: token,
          isAuthenticated: !!token,
        });

        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete api.defaults.headers.common["Authorization"];
        }
      },

      _updateToken: (token) => {
        set({ accessToken: token, isAuthenticated: true });
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },

      logout: () => {
        set({ accessToken: null, isAuthenticated: false });
        delete api.defaults.headers.common["Authorization"];
        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ accessToken: state.accessToken }),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          api.defaults.headers.common["Authorization"] = `Bearer ${state.accessToken}`;
        }
      },
    },
  ),
);
