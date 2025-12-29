import { Message } from "../model/types";

export const getMessageMarginTop = (current: Message, previous?: Message): string => {
  if (!previous) return "mt-0";
  if (previous.author.uid !== current.author.uid) return "mt-2 desktop:mt-3";
  return "mt-0.5 desktop:mt-2";
};
