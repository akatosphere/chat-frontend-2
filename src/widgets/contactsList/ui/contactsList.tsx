"use client";

// import { useContactsQuery } from "@/entities/contact/lib/useContactsQuery";
import { useEffect, useState } from "react";

import { mapChatMembersToContacts } from "@/entities/contact/model/mappers";
import { Contact, ContactListResponse } from "@/entities/contact/model/types";
import { ContactCard } from "@/entities/contact/ui/contactCard";
import { getUsers } from "@/entities/user/api/getUsers";
import { cn } from "@/shared/shadcn/lib/utils";
import { ListSeparator } from "@/shared/ui/listSeparator";
import { Searchbar } from "@/shared/ui/searchbar";

type ContactsListProps = {
  className?: string;
  initialData: ContactListResponse | null;
};

export const ContactsList: React.FC<ContactsListProps> = ({ className }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [globalUsers, setGlobalUsers] = useState<Contact[]>([]);
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useContactsQuery(
  //   initialData ?? undefined,
  // );
  // const allContacts = data?.pages.flatMap((page) => page.results) ?? [];

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!debouncedSearch) {
        setGlobalUsers([]);
        return;
      }

      const requestData = [
        { phone_or_nickname: debouncedSearch },
        { phone_or_nickname: `@${debouncedSearch}` },
        { phone_or_nickname: `+${debouncedSearch}` },
        { phone_or_nickname: `+7${debouncedSearch}` },
      ] as const;

      try {
        const res = await getUsers(requestData);
        if (res.success) {
          const data = mapChatMembersToContacts(res.data);
          setGlobalUsers(data);
        } else {
          console.error("Ошибка API:", res.error);
        }
      } catch (error) {
        console.error("Критическая ошибка в получении пользователя:", error);
      }
    };

    fetchContacts();
  }, [debouncedSearch]);

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4 p-4", className)}>
      <Searchbar value={search} onChange={setSearch} />
      <div>
        <ListSeparator text="Мои контакты" />
      </div>
      {globalUsers && (
        <>
          <div>
            <ListSeparator text="Пользователи А-чата" />
            {globalUsers.map((c, index) => {
              return <ContactCard contact={c} key={index} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};
