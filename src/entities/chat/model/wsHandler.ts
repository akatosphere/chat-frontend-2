import { WSBaseResponse } from "@/shared/types/wsTypes";

export const chatWSHandler = (data: WSBaseResponse) => {
  const chatActions = ["create_chat"];
  if (!chatActions.includes(data.action)) return;

  switch (
    data.action
    // здесь будет обработка приходящих ws сообщений, касающихся работы чата (новые сообщения, приглашения в группу и тд)
  ) {
  }
};
