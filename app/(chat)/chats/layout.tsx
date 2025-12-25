import { ChatSidebar } from "@/features/chatList/ui/chatSidebar";
import { NavBar } from "@/shared/navBar/ui/navBar";
import { AppHeader } from "@/shared/ui/appHeader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen max-w-300 flex-col gap-4">
      <AppHeader />
      <div className="mx-auto flex w-full flex-1 flex-row gap-4">
        <NavBar />
        {/* <div className="bg-gray flex h-[228px] min-w-12 flex-col items-center justify-between gap-3"></div> */}
        <ChatSidebar className="h-full flex-1" />
        {children}
      </div>
    </div>
  );
}
