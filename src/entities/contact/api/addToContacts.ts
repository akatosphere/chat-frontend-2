import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

import { mapContactDtoToContact } from "../model/mappers";
import { Contact, ContactDto } from "../model/types";

const ENDPOINT = "/api/v1/contact/messenger-add-by-phone/";

/**
 * Тип данных для тела запроса (Payload)
 */
export type AddByPhonePayload = {
  phone: string;
  first_name: string;
  last_name: string;
};

/**
 * Добавление пользователя в контакты по номеру телефона
 */
export const addToContacts = async (payload: AddByPhonePayload): Promise<Result<Contact>> => {
  try {
    // Вторым аргументом в .post передается body (payload)
    const { data } = await getApiClient.post<ContactDto>(ENDPOINT, payload);

    // Возвращаем успех и прогоняем через маппер
    console.log("Вроде добавился: ", data);

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
