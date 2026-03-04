import { create } from "zustand";

import { User } from "@/entities/user/model/types";

type UserInfoState = {
  userInfoByUid: Record<string, User>;

  setUserInfo: (uid: string, data: User) => void;
  patchUserInfo: (uid: string, patch: Partial<User>) => void;
  removeUserInfo: (uid: string) => void;
  reset: () => void;
};

export const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfoByUid: {},

  setUserInfo: (uid, data) =>
    set((state) => ({
      userInfoByUid: { ...state.userInfoByUid, [uid]: data },
    })),

  patchUserInfo: (uid, patch) =>
    set((state) => {
      const existing = state.userInfoByUid[uid];
      if (!existing) return state;
      return {
        userInfoByUid: {
          ...state.userInfoByUid,
          [uid]: { ...existing, ...patch },
        },
      };
    }),

  removeUserInfo: (uid) =>
    set((state) => {
      const { [uid]: _, ...rest } = state.userInfoByUid;
      return { userInfoByUid: rest };
    }),

  reset: () => set({ userInfoByUid: {} }),
}));
