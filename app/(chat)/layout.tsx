import { ResponsiveLayout } from "@/shared/layouts/responsiveLayout";
import { NavBar } from "@/shared/navBar/ui/navBar";
import QueryCustomProvider from "@/shared/providers/queryProvider";
import { AppHeader } from "@/shared/ui/appHeader";
import { ContextMenuProvider } from "@/shared/ui/contextMenu/contextMenuProvider";

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
            <ResponsiveLayout sidebar={sidebar} extra={extra}>
              {children}
            </ResponsiveLayout>
          </div>
        </div>
      </ContextMenuProvider>
    </QueryCustomProvider>
  );
}
