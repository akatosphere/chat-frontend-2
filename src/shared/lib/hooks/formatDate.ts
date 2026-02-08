import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return "";

  try {
    const date = new Date(timestamp * 1000); // Unix timestamp в миллисекунды
    if (isNaN(date.getTime())) return "";
    return format(date, "d MMMM yyyy", { locale: ru }); // "5 февраля 1996"
  } catch {
    return "";
  }
};
