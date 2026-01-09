import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

export default function BlacklistPage() {
  return (
    <>
      <SidebarHeader title="Черный список" backButton />
      <SidebarContainer className="flex items-center justify-center">
        <span className="subtext text-gray">Чёрный список пуст</span>
      </SidebarContainer>
    </>
  );
}
