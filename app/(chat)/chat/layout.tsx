import { ChatSidebar } from "@/features/chatList/ui/chatSidebar";
import { AppHeader } from "@/shared/ui/appHeader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-300 flex-col gap-4">
      <AppHeader />
      <div className="mx-auto flex w-full flex-row gap-4">
        <div className="bg-gray flex h-[228px] min-w-12 flex-col items-center justify-between gap-3"></div>
        <ChatSidebar />
        {children}
      </div>
    </div>
  );
}
