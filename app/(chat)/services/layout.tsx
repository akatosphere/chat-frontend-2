import { CreateGroupForm } from "@/features/createChat/ui/createChatForm";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="desktop:block hidden">
        <CreateGroupForm />
      </Sidebar>

      <MainContent>{children}</MainContent>
    </>
  );
}
