import { SettingsPageClient } from "app/(chat)/settings/settingsPageClient";

import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

export default async function SettingsPage() {
  return (
    <>
      <SidebarHeader title="Настройки" />
      <SidebarContainer className="">
        <SettingsPageClient />
      </SidebarContainer>
    </>
  );
}
