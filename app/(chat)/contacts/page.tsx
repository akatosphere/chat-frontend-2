import { ContactsPageClient } from "../../../src/widgets/contactsList/ui/contactsPageClient";

export default async function ContactsPage() {
  return <ContactsPageClient className="desktop:hidden" />;
}
