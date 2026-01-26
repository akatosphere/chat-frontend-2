import { getApiClient } from "@/shared/api/getApiClient";

import { mapContactListResponse } from "../model/mappers";
import { ContactListResponse, ContactListResponseDto } from "../model/types";

const ENDPOINT = "/api/v1/contact/messenger-list/";

/** Для клиентских компонентов (Infinite Query) */
export const getContacts = async (url?: string): Promise<ContactListResponse> => {
  // Если url передан (от TanStack Query), используем его, иначе базовый эндпоинт
  const targetUrl = url || ENDPOINT;
  const { data } = await getApiClient.get<ContactListResponseDto>(targetUrl);
  return mapContactListResponse(data);
};
