import { ContactsSearch } from "@/features/contacts/ui/contactsSearch";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className="desktop:block hidden">
        <ContactsSearch />
      </Sidebar>

      <MainContent>{children}</MainContent>
    </>
  );
}
