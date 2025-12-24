import { ChatSidebar } from "@/features/chatList/ui/chatSidebar";
import { AppHeader } from "@/shared/ui/appHeader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen max-w-300 flex-col gap-4">
      <AppHeader />
      <div className="mx-auto flex w-full flex-1 flex-row gap-4">
        <ChatSidebar className="h-full flex-1" />
        {children}
      </div>
    </div>
  );
}
