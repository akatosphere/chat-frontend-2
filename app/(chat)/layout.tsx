import { NavBar } from "@/shared/navBar/ui/navBar";
import QueryCustomProvider from "@/shared/providers/queryProvider";
import { AppHeader } from "@/shared/ui/appHeader";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="desktop:pb-1 desktop:px-3 mx-auto flex h-screen max-h-screen min-h-screen max-w-300 flex-col gap-4 overflow-hidden">
      <AppHeader />

      <div className="mx-auto flex w-full flex-1 flex-row gap-4">
        <NavBar />

        <QueryCustomProvider>{children}</QueryCustomProvider>
      </div>
    </div>
  );
}
