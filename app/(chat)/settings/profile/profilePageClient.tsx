"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import z from "zod";

import {
  getMessengerProfile,
  MessengerProfileSchema,
  updateMessengerProfile,
} from "@/entities/user/api/updateUserProfile";
import { UserProfileForm } from "@/features/settings/userProfileForm/ui/userProfileForm";

import { ProfilePageClientSkeleton } from "./profilePageClientSkeleton";

export const ProfilePageClient: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["messenger-profile"],
    queryFn: async () => {
      const res = await getMessengerProfile();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: updateMessengerProfile,
    onSuccess: () => {
      // После успешного обновления — обновляем кэш
      queryClient.invalidateQueries({ queryKey: ["messenger-profile"] });
    },
  });

  const onSubmit = async (data: z.infer<typeof MessengerProfileSchema>) => {
    try {
      await mutation.mutateAsync(data);
      router.push("/settings");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <ProfilePageClientSkeleton />;
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  if (!data) {
    return <div>Профиль не найден</div>;
  }

  return (
    <UserProfileForm
      onSubmit={onSubmit}
      profile={data}
      avatarUrl={data.avatar_url}
      lastName={data.last_name}
      name={data.first_name}
      phone={data.phone}
      nickname={data.nickname}
      description={data.additional_information}
      birthday={data.birthday}
    />
  );
};
