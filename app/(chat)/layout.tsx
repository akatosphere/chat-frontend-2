import { NavBar } from "@/shared/navBar/ui/navBar";
import QueryCustomProvider from "@/shared/providers/queryProvider";
import { AppHeader } from "@/shared/ui/appHeader";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";
import { ContextMenuProvider } from "@/widgets/contextMenu/ui/contextMenu";

export default function ChatLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="desktop:pb-1 desktop:px-3 mx-auto flex h-dvh max-h-dvh min-h-dvh max-w-300 flex-col gap-4 overflow-hidden">
      <AppHeader />

      <div className="desktop:flex-row desktop:gap-4 mx-auto flex h-full min-h-0 w-full flex-col">
        <NavBar className="desktop:order-1 order-2" />
        <QueryCustomProvider>
          <ContextMenuProvider>
            <Sidebar>{left}</Sidebar>
            <MainContent>{right}</MainContent>
          </ContextMenuProvider>
        </QueryCustomProvider>
      </div>
    </div>
  );
}
