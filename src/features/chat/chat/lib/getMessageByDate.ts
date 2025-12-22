import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";

import { Message } from "../model/types";

export const groupMessagesByDate = (
  messages: Message[],
): {
  id: string;
  date: string;
  label: string;
  messages: Message[];
}[] => {
  const sortedMessages = [...messages].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  );

  const groups = new Map<string, Message[]>();

  for (const message of sortedMessages) {
    const messageDate = message.createdAt;

    const localDateKey = format(messageDate, "yyyy-MM-dd");

    const group = groups.get(localDateKey) ?? [];
    group.push(message);
    groups.set(localDateKey, group);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateKey, messages]) => {
      const date = new Date(dateKey);

      let label: string;
      if (isToday(date)) {
        label = "Сегодня";
      } else if (isYesterday(date)) {
        label = "Вчера";
      } else {
        const currentYear = new Date().getFullYear();
        const messageYear = date.getFullYear();

        label = format(date, messageYear === currentYear ? "d MMMM" : "d MMMM yyyy", {
          locale: ru,
        });
      }

      return {
        id: dateKey,
        date: dateKey,
        label,
        messages,
      };
    });
};
