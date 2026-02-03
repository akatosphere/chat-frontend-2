import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { UserEntity } from "./types";

type OtherUsersState = {
  users: Record<string, UserEntity>;

  upsertUser: (user: UserEntity) => void;
  upsertUsers: (users: UserEntity[]) => void;

  getUser: (uid: string) => UserEntity | unknown;
};

export const useOtherUsersStore = create<OtherUsersState>()(
  devtools(
    (set, get) => ({
      users: {},

      upsertUser: (user) => {
        set((state) => ({
          users: {
            ...state.users,
            [user.uid]: {
              // Сохраняем старые данные, если они есть (например, био)
              // и накладываем новые (например, обновленный онлайн статус)
              ...(state.users[user.uid] || {}),
              ...user,
            },
          },
        }));
      },

      upsertUsers: (newUsers) => {
        if (!newUsers.length) return;

        set((state) => {
          const updatedUsers = { ...state.users };

          newUsers.forEach((user) => {
            updatedUsers[user.uid] = {
              ...(state.users[user.uid] || {}),
              ...user,
            };
          });

          return { users: updatedUsers };
        });
      },

      getUser: (uid) => get().users[uid] || undefined,
    }),
    { name: "OtherUsersStore" },
  ),
);
