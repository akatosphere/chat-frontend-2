// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

import api from "./apiClient";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  hasLoggedOut: boolean; // флаг для отмены refresh в случае логаута

  setAccessToken: (token: string | null) => void;
  logout: () => void;
  _updateToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      accessToken: null,
      isAuthenticated: false,
      hasLoggedOut: false,

      setAccessToken: (token) => {
        set({
          accessToken: token,
          isAuthenticated: !!token,
          hasLoggedOut: false,
        });

        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete api.defaults.headers.common["Authorization"];
        }
      },

      _updateToken: (token) => {
        set({
          accessToken: token,
          isAuthenticated: true,
          hasLoggedOut: false,
        });

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },

      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          hasLoggedOut: true,
        });

        delete api.defaults.headers.common["Authorization"];

        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
      },
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        accessToken: state.accessToken,
      }),

      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          api.defaults.headers.common["Authorization"] = `Bearer ${state.accessToken}`;
        }
      },
    },
  ),
);
