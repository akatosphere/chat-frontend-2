import { Contact } from "@/entities/contact/model/types";
import { ContactCardFeature } from "@/features/contacts/addToContacts/ui/ContactCardFeature";
import { cn } from "@/shared/shadcn/lib/utils";
import { ListSeparator } from "@/shared/ui/listSeparator";

type ContactsListProps = {
  className?: string;
  contacts: Contact[];
};

export const ContactsList: React.FC<ContactsListProps> = ({ className, contacts }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <ListSeparator text="Мои контакты" />
      {contacts.map((c, index) => {
        return <ContactCardFeature contact={c} key={index} />;
      })}
    </div>
  );
};
