import { Contact } from "@/entities/contact/model/types";
import { ContactCard } from "@/entities/contact/ui/contactCard";
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
        return <ContactCard contact={c} key={index} />;
      })}
    </div>
  );
};
