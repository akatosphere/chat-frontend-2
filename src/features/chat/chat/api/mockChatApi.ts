import { mockMessagesPage } from "../lib/mock";

export const fetchMessagesPage = async () => {
  await new Promise((r) => setTimeout(r, 400));
  return mockMessagesPage;
};
