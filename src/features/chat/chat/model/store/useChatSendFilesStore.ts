import { create } from "zustand";

export type PendingImage = {
  id: string;
  file: File;
  previewUrl: string;
};

type SendMessageState = {
  text: string;
  images: PendingImage[];

  setText: (text: string) => void;

  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  clear: () => void;
};

export const useSendMessageStore = create<SendMessageState>((set) => ({
  text: "",
  images: [],

  setText: (text) => set({ text }),

  addImages: (files) =>
    set((state) => {
      const remaining = 4 - state.images.length;
      const nextFiles = files.slice(0, remaining);

      const mapped = nextFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      console.log("mapped", mapped);
      return { images: [...state.images, ...mapped] };
    }),

  removeImage: (id) =>
    set((state) => ({
      images: state.images.filter((img) => img.id !== id),
    })),

  clear: () => set({ text: "", images: [] }),
}));
