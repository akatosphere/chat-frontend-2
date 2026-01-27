import { useMemo } from "react";

import { Contact } from "@/entities/contact/model/types";

type UseContactsLogicProps = {
  contacts: Contact[];
  globalUsers: Contact[];
  search: string;
  isLoading: boolean;
  isInitialized: boolean;
};

export const useContactsLogic = ({
  contacts,
  globalUsers,
  search,
  isLoading,
  isInitialized,
}: UseContactsLogicProps) => {
  const isSearching = search.trim().length > 0;

  // Фильтрация локальных контактов
  const filteredLocalContacts = useMemo(() => {
    if (!isSearching) return contacts;
    const query = search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.fullName.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.nickname?.toLowerCase().includes(query) ||
        c.username?.toLowerCase().includes(query),
    );
  }, [contacts, search, isSearching]);

  // Фильтрация глобальных (исключаем тех, кто уже в контактах)
  const filteredGlobalUsers = useMemo(() => {
    return globalUsers.filter(
      (globalUser) =>
        !contacts.some(
          (contact) => contact.systemUid === globalUser.uid || contact.uid === globalUser.uid,
        ),
    );
  }, [globalUsers, contacts]);

  // Вычисляемые состояния для UI
  const showLocalContacts =
    filteredLocalContacts.length > 0 || (!isSearching && contacts.length > 0);
  const showGlobalSearchResults = isSearching && filteredGlobalUsers.length > 0;
  const showNoResults =
    isSearching &&
    filteredLocalContacts.length === 0 &&
    filteredGlobalUsers.length === 0 &&
    !isLoading;

  const isInitialEmpty = !isSearching && contacts.length === 0 && isInitialized;
  const showLoader = !isInitialized || isLoading;

  return {
    isSearching,
    filteredLocalContacts,
    filteredGlobalUsers,
    showLocalContacts,
    showGlobalSearchResults,
    showNoResults,
    isInitialEmpty,
    showLoader,
  };
};
