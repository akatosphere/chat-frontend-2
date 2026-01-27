import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

import { mapContactDtoToContact } from "../model/mappers";
import { AddByPhonePayload, Contact, ContactDto } from "../model/types";

const ENDPOINT = "/api/v1/contact/messenger-add-by-phone/";

/**
 * Добавление пользователя в контакты по номеру телефона
 */
export const addToContacts = async (payload: AddByPhonePayload): Promise<Result<Contact>> => {
  try {
    // Вторым аргументом в .post передается body (payload)
    const { data } = await getApiClient.post<ContactDto>(ENDPOINT, payload);

    return {
      success: true,
      data: mapContactDtoToContact(data),
    };
  } catch (error) {
    // Используем ваш глобальный обработчик ошибок
    return {
      success: false,
      error: errorHandler(error),
    };
  }
};
