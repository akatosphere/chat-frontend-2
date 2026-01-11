import { ProfilePageClient } from "app/(chat)/settings/profile/profilePageClient";

import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

export default async function ProfilePage() {
  return (
    <>
      <SidebarHeader title="Редактирование профиля" backButton />
      <SidebarContainer>
        <ProfilePageClient />
      </SidebarContainer>
    </>
  );
}
