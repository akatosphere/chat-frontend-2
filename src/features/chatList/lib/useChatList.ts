"use client";

import { useEffect } from "react";

import { getChatList } from "../api/getChatList";
import { useChatListStore } from "../model/store";

export const useChatList = () => {
  const { setChats, setLoading, setError } = useChatListStore();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const chats = await getChatList();
        if (!cancelled) setChats(chats);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        if (!cancelled) setError("Не удалось загрузить чаты");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [setChats, setLoading, setError]);
};
