import { QueryBtn } from "@/shared/test/queryBtn";
import { WsDisconnectBtn } from "@/shared/test/wsDisconnectBtn";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="desktop:flex desktop:bg-main-light-gray bg-white">{children}</Sidebar>

      <MainContent className="desktop:flex hidden">
        <WsDisconnectBtn className="m-3 w-40" />
        <QueryBtn className="m-3 w-50" />
      </MainContent>
    </>
  );
}
