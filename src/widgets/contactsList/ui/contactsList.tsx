"use client";

// import { useContactsQuery } from "@/entities/contact/lib/useContactsQuery";
import { ContactListResponse } from "@/entities/contact/model/types";
import { cn } from "@/shared/shadcn/lib/utils";
import { ListSeparator } from "@/shared/ui/listSeparator";
import { Searchbar } from "@/shared/ui/searchbar";

import { useGlobalContactsSearch } from "../lib/useGlobalContactsSearch";
import { GlobalUsersList } from "./globalUsersList";

type ContactsListProps = {
  className?: string;
  initialData: ContactListResponse | null;
};

export const ContactsList: React.FC<ContactsListProps> = ({ className }) => {
  const { search, setSearch, globalUsers, hasResults } = useGlobalContactsSearch();
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useContactsQuery(
  //   initialData ?? undefined,
  // );
  // const allContacts = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4 p-4", className)}>
      <Searchbar value={search} onChange={setSearch} />
      <div>
        <ListSeparator text="Мои контакты" />
      </div>
      {hasResults && <GlobalUsersList globalUsers={globalUsers} />}
    </div>
  );
};
