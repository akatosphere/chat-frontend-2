export const getInitialPreview = (avatar: { data: string } | null): string => {
  if (!avatar) return "";
  return `data:image/png;base64,${avatar.data}`;
};
