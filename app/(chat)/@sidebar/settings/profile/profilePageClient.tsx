"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getProfile } from "@/entities/user/api/getProfile";
import { updateProfile } from "@/entities/user/api/updateProfile";
import { UpdateProfileData } from "@/entities/user/model/types";
import { UserProfileForm } from "@/features/settings/userProfileForm/ui/userProfileForm";

import { ProfilePageClientSkeleton } from "./profilePageClientSkeleton";

export const ProfilePageClient: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["messenger-profile"],
    queryFn: async () => {
      const res = await getProfile();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: UpdateProfileData) => {
      const res = await updateProfile(formData);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messenger-profile"] });
    },
  });

  const onSubmit = async (formData: UpdateProfileData) => {
    try {
      await mutation.mutateAsync(formData);
      router.push("/settings");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <ProfilePageClientSkeleton />;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Ошибка загрузки профиля</div>;
  }

  if (!data) {
    return <div className="p-4">Профиль не найден</div>;
  }

  return (
    <UserProfileForm
      onSubmit={onSubmit}
      profile={data}
      avatarUrl={data.avatarUrl}
      lastName={data.lastName || ""}
      name={data.firstName}
      phone={data.phone}
      nickname={data.nickname}
      description={data.bio}
      birthday={data.birthday}
    />
  );
};
