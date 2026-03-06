import { create } from "zustand";

export type PendingMedia = {
  id: number;
  file: File;
  previewUrl: string;
  type: "image" | "video";
};

type SendMediaState = {
  text: string;
  media: PendingMedia[];

  setText: (text: string) => void;

  addMedia: (files: File[]) => void;
  removeMedia: (id: number) => void;
  clear: () => void;
};

export const useSendMediaStore = create<SendMediaState>((set) => ({
  text: "",
  media: [],

  setText: (text) => set({ text }),

  addMedia: (files) =>
    set((state) => {
      const remaining = 4 - state.media.length;
      const nextFiles = files.slice(0, remaining);

      const mapped = nextFiles.map((file) => {
        const isVideo = file.type.startsWith("video/");

        return {
          id: Date.now() + Math.random(),
          file,
          previewUrl: URL.createObjectURL(file),
          type: (isVideo ? "video" : "image") as PendingMedia["type"],
        };
      });

      return { media: [...state.media, ...mapped] };
    }),

  removeMedia: (id) =>
    set((state) => ({
      media: state.media.filter((mediaItem) => mediaItem.id !== id),
    })),

  clear: () => set({ text: "", media: [] }),
}));
