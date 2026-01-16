import { WSBaseResponse } from "@/shared/types/wsTypes";

export const chatWSHandler = (data: WSBaseResponse) => {
  const chatActions = ["create_chat"];
  if (!chatActions.includes(data.action)) return;

  switch (data.action) {
    case "create_chat":
      // console.log("wsHandler create_group");

      break;
  }
};
