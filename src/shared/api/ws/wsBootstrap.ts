import { handleEditChat } from "@/entities/chat/api/ws/editChatHandler";
import {
  handleCreateTextMessage,
  handleDeleteMessage,
  handleReadStatus,
} from "@/features/chat/chat/api/ws/chatHandlers";
import { WS_ACTIONS } from "@/shared/constants/constants";

import { registerWSHandler } from "./wsHandlers";

export const bootstrapWSHandlers = () => {
  registerWSHandler(WS_ACTIONS.CREATE_TEXT_MESSAGE, handleCreateTextMessage);

  registerWSHandler(WS_ACTIONS.CHANGE_STATUS_READ_MESSAGE, handleReadStatus);

  registerWSHandler(WS_ACTIONS.DELETE_MESSAGE, handleDeleteMessage);

  registerWSHandler(WS_ACTIONS.EDIT_CHAT, handleEditChat);
};
