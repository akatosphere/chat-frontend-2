import { create } from "zustand";

import { detectAttachmentType } from "../../lib/detectAttachmentType";
import { getVideoThumbnail } from "../../lib/getVideoThumbnail";

export type AttachmentType = "image" | "video" | "audio" | "document";

export type PendingFile = {
  id: string;
  file: File;
  type: AttachmentType;

  title?: string;
  weight?: number;
  previewUrl?: string;
  duration?: number;
};

type SendFilesState = {
  attachments: PendingFile[];

  addFiles: (files: File[]) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useSendFilesStore = create<SendFilesState>((set) => ({
  attachments: [],

  addFiles: async (files) => {
    const pending: PendingFile[] = files.map((file) => {
      const type = detectAttachmentType(file);
      const id = crypto.randomUUID();

      return {
        id,
        file,
        type,
        title: file.name,
        weight: file.size,
        previewUrl: type === "image" ? URL.createObjectURL(file) : undefined,
      };
    });

    set((state) => ({
      attachments: [...state.attachments, ...pending],
    }));

    for (const item of pending) {
      if (item.type !== "video") continue;

      try {
        const previewUrl = await getVideoThumbnail(item.file);

        set((state) => ({
          attachments: state.attachments.map((a) => (a.id === item.id ? { ...a, previewUrl } : a)),
        }));
      } catch {
        console.error("Ошибка создания обложки для видео");
      }
    }
  },

  remove: (id) =>
    set((state) => ({
      attachments: state.attachments.filter((a) => a.id !== id),
    })),

  clear: () => set({ attachments: [] }),
}));
