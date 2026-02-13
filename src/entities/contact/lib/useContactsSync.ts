"use client";

import { useEffect } from "react";

import { useContactStore } from "../model/store";
import { ContactListResponse } from "../model/types";
import { useContactsQuery } from "./useContactsQuery";

export const useContactsSync = (initialData?: ContactListResponse | null) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useContactsQuery(initialData);

  const setContacts = useContactStore((s) => s.setContacts);

  useEffect(() => {
    if (!data) return;

    // Сплющиваем все страницы из TanStack Query
    const allFetchedContacts = data.pages.flatMap((page) => page.results);
    const totalCount = data.pages[0]?.count ?? 0;

    // Обновляем стор.
    setContacts(allFetchedContacts, totalCount);
  }, [data, setContacts]);

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
