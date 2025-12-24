"use client";

import { useQuery } from "@tanstack/react-query";

import { getMessengerProfile } from "@/features/auth/userForm/api/updateUserProfile";

export default function Page() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me", "profile"],
    queryFn: getMessengerProfile,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: 60 * 60 * 1000,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка</div>;
  if (!data?.success) return null;

  return (
    // <div className="flex flex-col gap-2">
    //   <span>Никнейм: {data.data.nickname}</span>
    //   <span>Имя: {data.data.first_name}</span>
    //   <span>Телефон: {data.data.phone}</span>
    // </div>
    <>
      <div className="bg-gray w-full text-white">Chat</div>
    </>
  );
}
