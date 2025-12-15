import { ReactNode } from "react";
import { PhotoIcon } from "./photoIcon";
import { VideoIcon } from "./videoIcon";

const IMAGE_TYPES = ["jpg", "jpeg", "png", "webp"];
const GIF_TYPES = ["gif"];
const VIDEO_TYPES = ["mp4", "mov", "webm", "avi"];
const FILE_TYPES = ["pdf", "doc", "docx", "xls", "xlsx", "zip", "rar"];

const MAX_ICONS_DISPLAY = 3;

type FilesSummary = {
  types: string[];
  count: number;
};

type Params = {
  content?: string;
  files?: FilesSummary | null;
};

export const getLastMessagePreview = ({
  content,
  files,
}: Params): { icons: ReactNode[]; text: string } => {
  if (!files || files.count === 0) {
    return { icons: [], text: content || "Сообщение" };
  }

  const { types, count } = files;
  const icons: ReactNode[] = [];

  const hasImages = types.some(
    (t) => IMAGE_TYPES.includes(t) || GIF_TYPES.includes(t)
  );
  const hasVideos = types.some((t) => VIDEO_TYPES.includes(t));
  const hasFiles = types.some((t) => FILE_TYPES.includes(t));

  if (hasImages && !hasVideos && !hasFiles) {
    const displayCount = Math.min(count, MAX_ICONS_DISPLAY);
    for (let i = 0; i < displayCount; i++) {
      icons.push(<PhotoIcon key={i} />);
    }
    return { icons, text: content || `${count} фото` };
  }

  if (hasVideos && !hasImages && !hasFiles) {
    const displayCount = Math.min(count, MAX_ICONS_DISPLAY);
    for (let i = 0; i < displayCount; i++) {
      icons.push(<VideoIcon key={i} />);
    }
    return { icons, text: content || `${count} видео` };
  }

  if (hasFiles && !hasImages && !hasVideos) {
    if (count === 1) {
      return {
        icons: [],
        text:
          content ||
          `${count} ${declension(count, ["файл", "файла", "файлов"])}`,
      };
    }

    const displayCount = Math.min(count, MAX_ICONS_DISPLAY);
    for (let i = 0; i < displayCount; i++) {
      icons.push(<PhotoIcon key={i} />);
    }
    return {
      icons,
      text:
        content || `${count} ${declension(count, ["файл", "файла", "файлов"])}`,
    };
  }

  if (hasImages) icons.push(<PhotoIcon key="picture" />);
  if (hasVideos) icons.push(<VideoIcon key="video" />);

  if (hasFiles && icons.length < 2) {
    icons.push(<PhotoIcon key="file-placeholder" />);
  }

  return { icons, text: content || `${count} медиа` };
};

const declension = (
  number: number,
  words: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)];
  return `${number} ${words[index]}`;
};
