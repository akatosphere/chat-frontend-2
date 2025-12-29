import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="desktop:block hidden">
        <span>Contacts</span>
      </Sidebar>

      <MainContent>{children}</MainContent>
    </>
  );
}
