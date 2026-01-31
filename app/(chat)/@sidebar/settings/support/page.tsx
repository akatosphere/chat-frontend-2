import { ProfileSupportForm } from "@/features/auth/supportForm/ui/profileSupportForm";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

export default function SupportPage() {
  return (
    <>
      <SidebarHeader title="Обращение в поддержку" backButton />
      <SidebarContainer>
        <ProfileSupportForm className="h-[500px]" />
      </SidebarContainer>
    </>
  );
}
