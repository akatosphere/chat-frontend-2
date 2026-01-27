"use client";

import { useMemo } from "react";

import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useContactStore } from "@/entities/contact/model/store";
import { ContactListResponse } from "@/entities/contact/model/types";
import { cn } from "@/shared/shadcn/lib/utils";
import { NoSearchResults } from "@/shared/ui/noSearchResults";
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
  const { search, setSearch, globalUsers, isLoading } = useGlobalContactsSearch();
  const isSearching = search.trim().length > 0;

  const filteredLocalContacts = useMemo(() => {
    if (!isSearching) return contacts;
    const query = search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.fullName.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.nickname?.toLowerCase().includes(query) ||
        c.username?.toLowerCase().includes(query),
    );
  }, [contacts, search, isSearching]);

  const filteredGlobalUsers = useMemo(() => {
    return globalUsers.filter(
      (globalUser) =>
        !contacts.some(
          (contact) => contact.systemUid === globalUser.uid || contact.uid === globalUser.uid,
        ),
    );
  }, [globalUsers, contacts]);

  const showNoResults =
    isSearching &&
    !isLoading &&
    filteredLocalContacts.length === 0 &&
    filteredGlobalUsers.length === 0;

  const showLocalContacts = filteredLocalContacts.length > 0 || !isSearching;
  const showGlobalSearchResults = isSearching && filteredGlobalUsers.length > 0;
  console.log(filteredLocalContacts);

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4 p-4", className)}>
      <Searchbar value={search} onChange={setSearch} />
      {showLocalContacts && <ContactsList contacts={filteredLocalContacts} />}
      {showGlobalSearchResults && <GlobalUsersList globalUsers={filteredGlobalUsers} />}
      {showNoResults && (
        <div className="flex flex-1 items-center justify-center">
          <NoSearchResults />
        </div>
      )}
    </div>
  );
};
