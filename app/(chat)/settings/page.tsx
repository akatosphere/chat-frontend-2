"use client";

import { useQuery } from "@tanstack/react-query";

import { LogoutBtn } from "@/features/auth/logoutBtn";
import { getMessengerProfile } from "@/features/auth/userForm/api/updateUserProfile";
import { getSocket } from "@/shared/api/wsClient";
import { Button } from "@/shared/shadcn/ui/button";

export default function SettingsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me", "profile"],
    queryFn: getMessengerProfile,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 60 * 60 * 1000,
  });
  const wsDisconnect = () => {
    const socket = getSocket();
    socket?.close();
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка</div>;
  if (!data?.success) return null;

  return (
    <div className="flex flex-col gap-2">
      <span>Никнейм: {data.data.nickname}</span>
      <span>Имя: {data.data.first_name}</span>
      <span>Телефон: {data.data.phone}</span>
      <LogoutBtn className="w-50" />
      <Button className="w-50" size="md" onClick={wsDisconnect}>
        Разорвать сокет
      </Button>
    </div>
  );
}
