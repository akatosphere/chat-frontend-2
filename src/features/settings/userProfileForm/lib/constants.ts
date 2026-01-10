export const MONTHS = [
  { value: 1, label: "Январь" },
  { value: 2, label: "Февраль" },
  { value: 3, label: "Март" },
  { value: 4, label: "Апрель" },
  { value: 5, label: "Май" },
  { value: 6, label: "Июнь" },
  { value: 7, label: "Июль" },
  { value: 8, label: "Август" },
  { value: 9, label: "Сентябрь" },
  { value: 10, label: "Октябрь" },
  { value: 11, label: "Ноябрь" },
  { value: 12, label: "Декабрь" },
] as const;

export const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1),
}));

const CURRENT_YEAR = new Date().getFullYear();

export const YEARS = Array.from({ length: CURRENT_YEAR - 1950 + 1 }, (_, i) => {
  const year = CURRENT_YEAR - i;
  return {
    value: year,
    label: String(year),
  };
});

export const GENDERS = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
] as const;
