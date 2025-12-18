import { Message, User } from "../model/types";

let nextId = 1000;

export async function sendMessageMock(
  content: string,
  currentUser: User,
  files: Message["files"] = []
): Promise<Message> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: nextId++,
        uid: `msg-${nextId}`,
        author: currentUser,
        content,
        files,
        createdAt: new Date(),
        isMine: true,
        status: "sent",
      });
    }, 300);
  });
}
