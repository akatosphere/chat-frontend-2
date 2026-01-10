export const getDefaultBirthday = (birthday?: number) => {
  if (!birthday) {
    return { day: 1, month: 1, year: 2000 };
  }

  const date = new Date(birthday * 1000);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};
