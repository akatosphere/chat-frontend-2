import { ChatsListPanel } from "@/features/chatList/ui/chatsListPanel";
import { NavBar } from "@/shared/navBar/ui/navBar";
import { AppHeader } from "@/shared/ui/appHeader";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen max-h-screen max-w-300 flex-col gap-4 pb-1">
      <AppHeader />
      <div className="mx-auto flex w-full flex-1 flex-row gap-4">
        <NavBar />
        <Sidebar>
          <ChatsListPanel />
        </Sidebar>
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
