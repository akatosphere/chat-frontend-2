import { ChatsListPanel } from "@/features/chatList/ui/chatsListPanel";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="desktop:block hidden">
        <ChatsListPanel />
      </Sidebar>

      <MainContent>{children}</MainContent>
    </>
  );
}
