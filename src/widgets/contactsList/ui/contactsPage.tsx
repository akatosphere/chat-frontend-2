"use client";

import { useEffect, useMemo, useRef } from "react";

import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useContactStore } from "@/entities/contact/model/store";
import { ContactListResponse } from "@/entities/contact/model/types";
import { cn } from "@/shared/shadcn/lib/utils";
import { ContactsListEmpty } from "@/shared/ui/contactsListEmpty";
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
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useContactsSync(initialData);
  const contacts = useContactStore((s) => s.contacts);
  const isInitialized = useContactStore((s) => s.isInitialized);
  const { search, setSearch, globalUsers, isLoading } = useGlobalContactsSearch();
  const isSearching = search.trim().length > 0;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || isSearching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, isSearching, fetchNextPage]);

  // ФИЛЬТРАЦИЯ РЕЗУЛЬТАТОВ
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

  // ЛОГИКА ПОКАЗА СТРАНИЦ
  const showNoResults =
    isSearching &&
    filteredLocalContacts.length === 0 &&
    filteredGlobalUsers.length === 0 &&
    !isLoading;

  const showLocalContacts =
    filteredLocalContacts.length > 0 || (!isSearching && contacts.length > 0);
  const showGlobalSearchResults = isSearching && filteredGlobalUsers.length > 0;
  const isInitialEmpty = !isSearching && contacts.length === 0 && isInitialized;
  console.log(filteredLocalContacts);

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4 p-4", className)}>
      <Searchbar value={search} onChange={setSearch} />
      <div className="scrollbar-hover flex flex-col overflow-y-auto">
        {showLocalContacts && <ContactsList contacts={filteredLocalContacts} />}
        {showGlobalSearchResults && <GlobalUsersList globalUsers={filteredGlobalUsers} />}
        {!isSearching && hasNextPage && (
          <div ref={loadMoreRef} className="flex justify-center py-4">
            {isFetchingNextPage ? <p className="text-sm text-gray-400">Загрузка...</p> : null}
          </div>
        )}
        {showNoResults && (
          <div className="flex flex-1 items-center justify-center">
            <NoSearchResults />
          </div>
        )}
        {isInitialEmpty && (
          <div className="flex flex-1 items-center justify-center">
            <ContactsListEmpty />
          </div>
        )}
        {(!isInitialized || isLoading) && (
          <div className="flex flex-1 items-center justify-center">
            <p>Загрузка</p>
          </div>
        )}
      </div>
    </div>
  );
};
