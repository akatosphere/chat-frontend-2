// функция для форматирования времени в читаемый вид
export const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) return `${hrs} ч ${String(mins).padStart(2, "0")} мин`;
  if (mins > 0) return `${mins}:${String(secs).padStart(2, "0")}`;
  return `${mins}:${String(secs).padStart(2, "0")}`;
};
