import { getApiServer } from "@/shared/api/getApiServer";

import { mapContactListResponse } from "../model/mappers";
import { ContactListResponse, ContactListResponseDto } from "../model/types";

const ENDPOINT = "/api/v1/contact/messenger-list/";

/** Для серверных компонентов (SSR) */
export const getContactsServer = async (): Promise<ContactListResponse | null> => {
  try {
    const api = await getApiServer();
    const { data } = await api.get<ContactListResponseDto>(ENDPOINT);
    return mapContactListResponse(data);
  } catch (error) {
    console.error("Failed to fetch contacts on server", error);
    return null;
  }
};
