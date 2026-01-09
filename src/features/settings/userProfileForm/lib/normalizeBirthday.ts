export const normalizeBirthday = (birthday?: {
  day?: number;
  month?: number;
  year?: number;
}): number | null => {
  if (birthday?.day != null && birthday?.month != null && birthday?.year != null) {
    const birthDate = new Date(Date.UTC(birthday.year, birthday.month - 1, birthday.day));
    return Math.floor(birthDate.getTime() / 1000);
  }
  return null;
};
