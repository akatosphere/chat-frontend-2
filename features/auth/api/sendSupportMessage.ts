import api from "@/shared/api/api-client";

export interface SendSupportMessageData {
  email: string;
  text: string;
}

export const sendSupportMessage = (data: SendSupportMessageData) => {
  return api.post("/api/v1/service/message/", data);
};
