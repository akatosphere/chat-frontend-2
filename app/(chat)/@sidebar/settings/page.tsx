import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { SettingsPageClient } from "./settingsPageClient";

export default async function SettingsPage() {
  return (
    <>
      <SidebarHeader title="Настройки" />
      <SidebarContainer>
        <SettingsPageClient />
      </SidebarContainer>
    </>
  );
}
