import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="desktop:flex desktop:bg-main-light-gray bg-white">{children}</Sidebar>

      <MainContent className="desktop:flex hidden"></MainContent>
    </>
  );
}
