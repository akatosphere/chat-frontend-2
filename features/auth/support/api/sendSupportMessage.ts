// src/features/support/api/send-message.ts

import api from "@/shared/api/inceptors";

export interface SendSupportMessageData {
  email: string;
  text: string;
}

export const sendSupportMessage = (data: SendSupportMessageData) => {
  return api.post("/api/v1/service/message/", data);
};
