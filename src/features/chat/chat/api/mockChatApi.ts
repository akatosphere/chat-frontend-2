import { generateMockMessages, MockScenario } from "../lib/mock";
import { ApiMessage } from "../model/types";

const PAGE_SIZE = 30;

// Генерируем моки при первом вызове
let allMockMessages = generateMockMessages("all-read");

export const setMockScenario = (scenario: MockScenario) => {
  allMockMessages = generateMockMessages(scenario);
};

export const fetchMessagesPage = async (
  page: number = 1
): Promise<{
  results: ApiMessage[];
  next: string | null;
  previous: string | null;
}> => {
  await new Promise((resolve) =>
    setTimeout(resolve, 400 + Math.random() * 600)
  );

  const total = allMockMessages.length;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = allMockMessages.slice(start, end);

  return {
    results: slice,
    next: end < total ? `/page/${page + 1}` : null,
    previous: page > 1 ? `/page/${page - 1}` : null,
  };
};
