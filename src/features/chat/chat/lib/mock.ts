import { ApiMessage } from "../model/types";

const CURRENT_USER_UID = "user-me";
const OTHER_USER_UID = "user-other";

export type MockScenario = "all-read" | "has-unread";

export const generateMockMessages = (
  scenario: MockScenario = "all-read"
): ApiMessage[] => {
  const now = Date.now();
  const messages: ApiMessage[] = [];
  let id = 1;

  const add = (
    content: string,
    isMine: boolean,
    minutesAgo: number,
    files = 0,
    isRead = true
  ) => {
    const created_at = now - minutesAgo * 60 * 1000;
    messages.push({
      id: id++,
      content,
      created_at,
      from_user: { uid: isMine ? CURRENT_USER_UID : OTHER_USER_UID },
      files_list: Array.from({ length: files }, (_, i) => ({
        id: i,
        file_url: "",
        file_type: "image",
      })),
      // new: true — доставлено (не прочитано), false — прочитано, undefined — отправлено мной
      new: isRead ? false : true,
    });
  };

  // Старые прочитанные сообщения (ниже всех)
  for (let i = 100; i >= 30; i--) {
    const minutesAgo = i * 15 + Math.random() * 60;
    const isMine = Math.random() > 0.5;
    add(
      ["Старое сообщение", "Ок", "Понял", "😂", "Спасибо", "Давай"][
        Math.floor(Math.random() * 6)
      ],
      isMine,
      minutesAgo
    );
  }

  if (scenario === "has-unread") {
    // 30 непрочитанных сообщений от собеседника
    for (let i = 29; i >= 0; i--) {
      add(
        `Непрочитанное сообщение #${30 - i}`,
        false,
        i * 2 + 5,
        Math.random() > 0.7 ? 1 : 0,
        false
      );
    }
  } else {
    // Просто прочитанные
    for (let i = 20; i >= 0; i--) {
      const isMine = Math.random() > 0.4;
      add(`Сообщение #${21 - i}`, isMine, i * 3, Math.random() > 0.8 ? 1 : 0);
    }
  }

  return messages.sort((a, b) => a.created_at - b.created_at); // от старых к новым
};
