"use client";

import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useContactStore } from "@/entities/contact/model/store";
import { ContactListResponse } from "@/entities/contact/model/types";
import { DeleteContactsBtn } from "@/features/contacts/deleteContacts/ui/deleteContactsBtn";
import { useSelectContactsStore } from "@/features/contacts/model/SelectContactsStore";
import { cn } from "@/shared/shadcn/lib/utils";
import { ContactsListEmpty } from "@/shared/ui/contactsListEmpty";
import { NoSearchResults } from "@/shared/ui/noSearchResults";
import { Searchbar } from "@/shared/ui/searchbar";

import { useContactsLogic } from "../lib/useContactsLogic";
import { useGlobalContactsSearch } from "../lib/useGlobalContactsSearch";
import { useInfiniteScroll } from "../lib/useInfiniteScroll";
import { ContactsList } from "./contactsList";
import { GlobalUsersList } from "./globalUsersList";

type ContactsPageProps = {
  className?: string;
  initialData: ContactListResponse | null;
};

export const ContactsPage: React.FC<ContactsPageProps> = ({ className, initialData }) => {
  // Данные и внешние хуки
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useContactsSync(initialData);
  const { contacts, isInitialized } = useContactStore();
  const { search, setSearch, globalUsers, isLoading } = useGlobalContactsSearch();
  const isSelecting = useSelectContactsStore((s) => s.isSelecting);

  // Использование выделенной логики
  const logic = useContactsLogic({
    contacts,
    globalUsers,
    search,
    isLoading,
    isInitialized,
  });

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    isSearching: logic.isSearching,
    fetchNextPage,
  });
  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4 p-4", className)}>
      <Searchbar value={search} onChange={setSearch} />

      <div className="scrollbar-hover flex h-full flex-col overflow-x-hidden overflow-y-auto">
        {logic.showLocalContacts && <ContactsList contacts={logic.filteredLocalContacts} />}

        {logic.showGlobalSearchResults && (
          <GlobalUsersList globalUsers={logic.filteredGlobalUsers} />
        )}

        {!logic.isSearching && hasNextPage && (
          <div ref={loadMoreRef} className="flex justify-center py-4">
            {isFetchingNextPage && <p className="text-sm text-gray-400">Загрузка...</p>}
          </div>
        )}

        {logic.showNoResults && (
          <div className="flex flex-1 items-center justify-center">
            <NoSearchResults />
          </div>
        )}

        {logic.isInitialEmpty && (
          <div className="flex flex-1 items-center justify-center">
            <ContactsListEmpty />
          </div>
        )}

        {logic.showLoader && (
          <div className="flex flex-1 items-center justify-center">
            <p>Загрузка</p>
          </div>
        )}
      </div>
      {isSelecting && <DeleteContactsBtn />}
    </div>
  );
};
