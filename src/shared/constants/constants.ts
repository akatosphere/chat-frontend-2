export const MESSAGE_STATUS = {
  PENDING: "pending",
  DELIVERED: "delivered",
  FAILED: "failed",
  READ: "read",
} as const;

export const WS_ACTIONS = {
  CREATE_TEXT_MESSAGE: "create_text_message",
  CHANGE_STATUS_READ_MESSAGE: "change_status_read_message",
  ADD_MEMBERS_TO_CHAT: "add_members_to_chat",
  DELETE_MESSAGE: "delete_message",
} as const;
