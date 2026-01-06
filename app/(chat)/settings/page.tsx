import { getMessengerProfile } from "@/features/auth/userForm/api/updateUserProfile";
import { DESCTRUCTIVE_MENU } from "@/shared/ui/menuList/lib/destructiveData";
import { SETTINGS_MENU } from "@/shared/ui/menuList/lib/settingsData";
import { MenuList } from "@/shared/ui/menuList/ui/menuList";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";
import { UserProfile } from "@/shared/ui/userProfile/userProfile";

export default async function SettingsPage() {
  const result = await getMessengerProfile();

  if (!result.success) {
    throw new Error(result.error);
  }

  const profile = result.data;
  return (
    <>
      <SidebarHeader title="Настройки" />
      <SidebarContainer className="">
        <UserProfile
          avatarUrl={profile.avatar_url}
          name={profile.first_name}
          phone={profile.phone}
          tag={profile.nickname}
          className="mb-4"
        />
        <MenuList items={SETTINGS_MENU} />
        <MenuList items={DESCTRUCTIVE_MENU} className="mt-auto" isDestructive />
      </SidebarContainer>
    </>
  );
}
