import { getMessengerProfile } from "@/features/auth/userForm/api/updateUserProfile";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";
import { UserProfileForm } from "@/shared/ui/userProfileForm/userProfileForm";

export default async function ProfilePage() {
  const result = await getMessengerProfile();

  if (!result.success) {
    throw new Error(result.error);
  }

  const profile = result.data;
  return (
    <>
      <SidebarHeader title="Редактирование профиля" backButton />
      <SidebarContainer>
        <UserProfileForm
          profile={profile}
          avatarUrl={profile.avatar_url}
          lastName={profile.last_name}
          name={profile.first_name}
          phone={profile.phone}
          nickname={profile.nickname}
          description={profile.additional_information}
          birthday={profile.birthday}
        />
      </SidebarContainer>
    </>
  );
}
