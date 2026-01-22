// Делал для получения userId. Но решил попробовать получать его при подключении к WS.
"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useUserStore } from "@/entities/chat/model/userStore";
import { getMessengerProfile } from "@/entities/user/api/updateUserProfile";

import { useAuthStore } from "../api/store";

export const AuthBootstrap = () => {
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUserId = useUserStore((s) => s.setUserId);

  const { data } = useQuery({
    queryKey: ["messenger-profile"],
    queryFn: async () => {
      const res = await getMessengerProfile();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: isInitialized && !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.uid) {
      setUserId(data.uid);
    }
  }, [data, setUserId]);

  return null;
};
