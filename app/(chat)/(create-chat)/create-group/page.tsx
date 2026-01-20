import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";
import { CreateChat } from "@/widgets/createChat/ui/createChat";

export default function CreateGroupPage() {
  return (
    <>
      <SidebarHeader title="Создать группу" backButton />
      <SidebarContainer className="">
        <CreateChat groupOrChannel="group" />
      </SidebarContainer>
    </>
  );
}
