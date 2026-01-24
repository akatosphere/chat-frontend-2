import { ChatMemberDto } from "@/entities/user/model/types";
import { cn } from "@/shared/shadcn/lib/utils";

import { ContactsListItem } from "./contactsListItem";

type ContactsListProps = {
  className?: string;
  contacts: ChatMemberDto[];
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
