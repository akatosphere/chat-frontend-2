import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

export default function DefaultPage() {
  return (
    <>
      <SidebarHeader title="Информация" closeButton />
      <SidebarContainer className="">страница профиля</SidebarContainer>
    </>
  );
}
