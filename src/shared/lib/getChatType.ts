export const getChatType = (chatKey: string) => {
  if (chatKey.startsWith("group")) return "group";
  if (chatKey.startsWith("channel")) return "channel";
  return "chat";
};
