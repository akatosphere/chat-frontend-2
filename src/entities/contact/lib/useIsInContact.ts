"use client";

import { useContactStore } from "../model/store";

/**
 * Хук для проверки, находится ли пользователь в контактах (реактивный).
 * Подписывается на Zustand store и мгновенно обновляется при изменении контактов.
 *
 * @param uid - systemUid пользователя для проверки
 * @returns true если пользователь в контактах, false в противном случае
 */
export const useIsInContact = (uid: string): boolean => {
  const contacts = useContactStore((s) => s.contacts);
  return contacts.some((contact) => contact.systemUid === uid);
};
