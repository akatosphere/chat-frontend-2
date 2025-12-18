import { mockMessagesPage } from "../lib/mock";

export async function fetchMessagesPage() {
  await new Promise((r) => setTimeout(r, 400));
  return mockMessagesPage;
}
