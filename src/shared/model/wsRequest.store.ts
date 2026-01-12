import { create } from "zustand";

type WSRequestEntry = {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
};

interface WSRequestStore {
  pendingRequests: Map<string, WSRequestEntry>;
  trackRequest: <T>(uid: string) => Promise<T>;
  fulfillRequest: (uid: string, data: unknown, isError?: boolean) => void;
}

export const useWSRequestStore = create<WSRequestStore>((set, get) => ({
  pendingRequests: new Map(),

  trackRequest: <T>(uid: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const entry: WSRequestEntry = {
        resolve: resolve as (value: unknown) => void,
        reject: reject as (reason: unknown) => void,
      };

      set((state) => {
        const newMap = new Map(state.pendingRequests);
        newMap.set(uid, entry);
        return { pendingRequests: newMap };
      });
    });
  },

  fulfillRequest: (uid, data, isError) => {
    const { pendingRequests } = get();
    const entry = pendingRequests.get(uid);

    if (entry) {
      if (isError) {
        entry.reject(data);
      } else {
        entry.resolve(data);
      }

      set((state) => {
        const newMap = new Map(state.pendingRequests);
        newMap.delete(uid);
        return { pendingRequests: newMap };
      });
    }
  },
}));
