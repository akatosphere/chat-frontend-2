import { getApiClient } from "@/shared/api/getApiClient";

import { mapContactListResponse } from "../model/mappers";
import { ContactListResponse, ContactListResponseDto } from "../model/types";

const ENDPOINT = "/api/v1/contact/messenger-list/";

export const getContacts = async (url?: string): Promise<ContactListResponse> => {
  let targetUrl = ENDPOINT;

  // Если URL пришел из поля "next" бэкенда
  if (url) {
    try {
      const parsed = new URL(url);
      // Превращаем "http://api.example.org/api/v1/...?page=2"
      // в "/api/v1/...?page=2"
      targetUrl = parsed.pathname + parsed.search;
    } catch {
      // Если это не URL (например, просто строка пути), используем как есть
      targetUrl = url;
    }
  }

  const { data } = await getApiClient.get<ContactListResponseDto>(targetUrl);
  return mapContactListResponse(data);
};
