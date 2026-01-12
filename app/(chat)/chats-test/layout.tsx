import { NavBar } from "@/shared/navBar/ui/navBar";
import QueryCustomProvider from "@/shared/providers/queryProvider";
import { AppHeader } from "@/shared/ui/appHeader";
import { ContextMenuProvider } from "@/widgets/contextMenu/ui/contextMenu";

export default function MessengerLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <QueryCustomProvider>
      <ContextMenuProvider>
        <div className="mx-auto flex h-dvh max-w-300 flex-col overflow-hidden">
          <AppHeader />

          <div className="flex min-h-0 flex-1">
            {/* LEFT */}
            <aside className="w-[320px] border-r">{left}</aside>

            {/* RIGHT */}
            <main className="min-w-0 flex-1">{right}</main>
          </div>

          <NavBar />
        </div>
      </ContextMenuProvider>
    </QueryCustomProvider>
  );
}
