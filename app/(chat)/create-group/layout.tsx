import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="desktop:flex desktop:bg-main-light-gray bg-white">{children}</Sidebar>

      <MainContent className="desktop:flex hidden">
        <span className="desktop:flex text text-gray hidden h-full items-center justify-center">
          Выберите контакт для начала общения
        </span>
      </MainContent>
    </>
  );
}
