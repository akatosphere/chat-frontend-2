import { getContactsServer } from "@/entities/contact/api/getContactsServer";
import { cn } from "@/shared/shadcn/lib/utils";
import { ContactsPage } from "@/widgets/contactsList/ui/contactsPage";

type ContactsPageClientProps = {
  className?: string;
};

export const ContactsPageClient: React.FC<ContactsPageClientProps> = async ({ className }) => {
  const initialContacts = await getContactsServer();
  return <ContactsPage initialData={initialContacts} className={cn("", className)} />;
};
