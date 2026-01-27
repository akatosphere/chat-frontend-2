"use client";

import { useEffect, useState } from "react";

import { mapChatMembersToContacts } from "@/entities/contact/model/mappers";
import { Contact } from "@/entities/contact/model/types";
import { getUsers } from "@/entities/user/api/getUsers";

/**
 * Хук для глобального поиска пользователей в А-чате.
 * Включает дебаунс ввода и обработку состояний запроса.
 */
export const useGlobalContactsSearch = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [globalUsers, setGlobalUsers] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Дебаунс ввода (500мс)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // 2. Логика запроса при изменении дебаунс-значения
  useEffect(() => {
    const fetchContacts = async () => {
      // Если поле пустое — очищаем результаты и выходим
      if (!debouncedSearch.trim()) {
        setGlobalUsers([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      const query = debouncedSearch.trim();
      const requestData = [
        { phone_or_nickname: query },
        { phone_or_nickname: `@${query}` },
        { phone_or_nickname: `+${query}` },
        { phone_or_nickname: `+7${query}` },
      ] as const;

      try {
        const res = await getUsers(requestData);

        if (res.success) {
          const formattedData = mapChatMembersToContacts(res.data);
          setGlobalUsers(formattedData);
        } else {
          setError(res.error);
          setGlobalUsers([]);
        }
      } catch (err) {
        console.error("Критическая ошибка поиска:", err);
        setError("Произошла ошибка при поиске");
        setGlobalUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [debouncedSearch]);

  return {
    search,
    setSearch,
    globalUsers,
    isLoading,
    error,
    hasResults: globalUsers.length > 0,
  };
};
