import api from "@/shared/api/api-client";

export interface SendCodeData {
  phone_number: string;
}

export const sendCode = (data: SendCodeData) => {
  return api.post("/api/v1/auth/messenger/login/get/code/", data);
};
