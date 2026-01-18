import { CreateGroupForm } from "@/features/createChat/ui/createChatForm";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

export default function CreateGroupPage() {
  return (
    <>
      <SidebarHeader title="Создать группу" backButton />
      <SidebarContainer className="">
        <CreateGroupForm className="" />
      </SidebarContainer>
    </>
  );
}
