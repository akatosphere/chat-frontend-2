// entities/contact/api/deleteContact.ts
import { errorHandler } from "@/shared/api/errorHandler";
import { getApiClient } from "@/shared/api/getApiClient";
import { Result } from "@/shared/api/types";

/**
 * Удаление одного контакта по UID
 */
export const deleteContact = async (uid: string): Promise<Result<null>> => {
  try {
    // В DELETE запросах обычно не передают body, поэтому вторым аргументом в axios идет конфиг
    await getApiClient.delete(`/api/v1/contact/messenger-delete-contact/${uid}/`);

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      error: errorHandler(error),
    };
  }
};
