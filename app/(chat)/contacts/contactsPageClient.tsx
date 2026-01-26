import { getContactsServer } from "@/entities/contact/api/getContactsServer";
import { ContactsList } from "@/widgets/contactsList/ui/contactsList";

export default async function ContactsPageClient() {
  const initialContacts = await getContactsServer();
  return <ContactsList initialData={initialContacts} className="" />;
}
