import { NavBar } from "@/shared/navBar/ui/navBar";
import QueryCustomProvider from "@/shared/providers/queryProvider";
import { AppHeader } from "@/shared/ui/appHeader";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";
import { ContextMenuProvider } from "@/widgets/contextMenu/ui/contextMenuProvider";

type ChatLayoutProps = {
  children: React.ReactNode; // Центральная область (Main)
  sidebar: React.ReactNode; // Левая область
  extra: React.ReactNode; // Правая область (опционально)
};

export default function ChatLayout({ children, sidebar, extra }: ChatLayoutProps) {
  return (
    <QueryCustomProvider>
      <ContextMenuProvider>
        <div className="desktop:pb-1 desktop:px-3 mx-auto flex h-dvh max-h-dvh min-h-dvh max-w-300 flex-col gap-4 overflow-hidden">
          <AppHeader />
          <div className="desktop:flex-row desktop:gap-4 mx-auto flex h-full min-h-0 w-full flex-col-reverse">
            <NavBar />
            <Sidebar className="desktop:flex desktop:bg-main-light-gray hidden bg-white">
              {sidebar}
            </Sidebar>
            <MainContent>{children}</MainContent>
            {extra && (
              <Sidebar className="desktop:flex desktop:bg-main-light-gray hidden bg-white">
                {extra}
              </Sidebar>
            )}
          </div>
        </div>
      </ContextMenuProvider>
    </QueryCustomProvider>
  );
}
