"use client";
import { useEffect, useState } from "react";

import { ChatUser } from "@/entities/chat/model/types";
import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { getContacts } from "../api/getContacts";
import { ContactsList } from "./contactsList";

type ContactsSearchProps = {
  className?: string;
};

export const ContactsSearch: React.FC<ContactsSearchProps> = ({ className }) => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<ChatUser[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!debouncedSearch) {
        setContacts([]);
        return;
      }

      const requestData = [
        { phone_or_nickname: debouncedSearch },
        { phone_or_nickname: `@${debouncedSearch}` },
        { phone_or_nickname: `+${debouncedSearch}` },
        { phone_or_nickname: `+7${debouncedSearch}` },
      ] as const;

      const res = await getContacts(requestData);
      if (res.success) setContacts(res.data);
    };

    fetchContacts();
  }, [debouncedSearch]);

  return (
    <div className={cn("", className)}>
      <Searchbar value={search} onChange={setSearch} />
      <ContactsList contacts={contacts || []} />
    </div>
  );
};
