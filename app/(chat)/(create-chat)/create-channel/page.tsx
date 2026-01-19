import { CreateChatForm } from "@/features/createChat/ui/createChatForm";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

export default function CreateGroupPage() {
  return (
    <>
      <SidebarHeader title="Создать канал" backButton />
      <SidebarContainer className="">
        <CreateChatForm groupOrChannel="channel" />
      </SidebarContainer>
    </>
  );
}
