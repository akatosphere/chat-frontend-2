import { ChatUser } from "@/entities/chat/model/types";
import { cn } from "@/shared/shadcn/lib/utils";

import { ContactsListItem } from "./contactsListItem";

type ContactsListProps = {
  className?: string;
  contacts: ChatUser[];
};

export const ContactsList: React.FC<ContactsListProps> = ({ className, contacts }) => {
  return (
    <div className={cn("", className)}>
      {contacts.map((c) => {
        return <ContactsListItem key={c.uid} user={c} />;
      })}
    </div>
  );
};
