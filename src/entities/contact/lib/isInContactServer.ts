import { getContactsServer } from "../api/getContactsServer";

/**
 * Проверяет, есть ли пользователь с указанным uid в списке контактов.
 * Используется в серверных компонентах (SSR).
 *
 * @param uid - UID пользователя для проверки
 * @returns true если пользователь найден в контактах, false в противном случае
 */
export const isInContactServer = async (uid: string): Promise<boolean> => {
  const contacts = await getContactsServer();

  if (!contacts?.results) {
    return false;
  }

  return contacts.results.some((contact) => contact.systemUid === uid);
};
