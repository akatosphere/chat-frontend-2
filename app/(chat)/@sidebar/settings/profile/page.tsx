import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { ProfilePageClient } from "./profilePageClient";

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
