export const formatLastSeen = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffHour < 24) {
    return date.toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (diffDay < 7) {
    return date.toLocaleDateString("ru", { weekday: "short" }).toUpperCase();
  }

  return date.toLocaleDateString("ru", {
    day: "2-digit",
    month: "2-digit",
  });
};
