"use client";
import { useQuery } from "@tanstack/react-query";

import { SettingsMenu } from "@/entities/settings/settingsMenu/ui/settingsMenu";
import { getMessengerProfile } from "@/features/auth/userForm/api/updateUserProfile";

import { UserProfile } from "../../../src/widgets/userProfile/userProfile";
import { SettingsPageClientSkeleton } from "./settingsPageClientSkeleton";

export const SettingsPageClient: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["messenger-profile"],
    queryFn: async () => {
      const res = await getMessengerProfile();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  if (isLoading) return <SettingsPageClientSkeleton />;

  if (isError) return <div>Ошибка</div>;

  if (!data) return <div>Не найдено</div>;

  return (
    <>
      <UserProfile
        avatarUrl={data.avatar_url}
        name={data.first_name + " " + data.last_name}
        phone={data.phone}
        tag={data.nickname}
        className="mb-4"
      />
      <SettingsMenu uid={data.uid} />
    </>
  );
};
