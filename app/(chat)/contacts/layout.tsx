import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="">{children}</Sidebar>

      <MainContent className="desktop:flex hidden">Контакты</MainContent>
    </>
  );
}
