"use client";

import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useContactStore } from "@/entities/contact/model/store";
import { ContactListResponse } from "@/entities/contact/model/types";
import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { useGlobalContactsSearch } from "../lib/useGlobalContactsSearch";
import { ContactsList } from "./contactsList";
import { GlobalUsersList } from "./globalUsersList";

type ContactsPageProps = {
  className?: string;
  initialData: ContactListResponse | null;
};

export const ContactsPage: React.FC<ContactsPageProps> = ({ className, initialData }) => {
  useContactsSync(initialData);
  const contacts = useContactStore((s) => s.contacts);
  const { search, setSearch, globalUsers, hasResults } = useGlobalContactsSearch();
  console.log(contacts);

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4 p-4", className)}>
      <Searchbar value={search} onChange={setSearch} />
      <div>
        <ContactsList contacts={contacts} />
      </div>
      {hasResults && <GlobalUsersList globalUsers={globalUsers} />}
    </div>
  );
};
