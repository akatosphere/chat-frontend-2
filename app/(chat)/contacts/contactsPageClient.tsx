import { getContactsServer } from "@/entities/contact/api/getContactsServer";
import { ContactsPage } from "@/widgets/contactsList/ui/contactsPage";

export default async function ContactsPageClient() {
  const initialContacts = await getContactsServer();
  return <ContactsPage initialData={initialContacts} className="" />;
}
