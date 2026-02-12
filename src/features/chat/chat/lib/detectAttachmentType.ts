import { AttachmentType } from "../model/store/useChatSendFilesStore";

const IMAGE_TYPES = ["image/"];
const VIDEO_TYPES = ["video/"];
const AUDIO_TYPES = ["audio/"];

export const detectAttachmentType = (file: File): AttachmentType => {
  const { type } = file;

  if (IMAGE_TYPES.some((t) => type.startsWith(t))) return "image";
  if (VIDEO_TYPES.some((t) => type.startsWith(t))) return "video";
  if (AUDIO_TYPES.some((t) => type.startsWith(t))) return "audio";

  return "document";
};
