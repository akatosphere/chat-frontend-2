import { pluralize } from "@/shared/lib/pluralize";

export const formatOnlineTime = (wasOnlineAt: number, isOnline?: boolean | null): string => {
  const now = Date.now();
  const last = wasOnlineAt * 1000;
  const diff = now - last;

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  if (isOnline) return "в сети";
  if (diff < 0) return "соединение...";

  if (diff < MINUTE) {
    return "был(а) только что";
  } else if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE);
    return `был(а) ${minutes} ${pluralize(minutes, "минуту", "минуты", "минут")} назад`;
  } else if (diff < DAY) {
    const hours = Math.floor(diff / HOUR);
    return `был(а) ${hours} ${pluralize(hours, "час", "часа", "часов")} назад`;
  } else if (diff < 2 * DAY) {
    const date = new Date(last);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `был(а) вчера в ${hours}:${minutes}`;
  } else {
    const date = new Date(last);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `был(а) ${day}.${month}.${year}`;
  }
};
