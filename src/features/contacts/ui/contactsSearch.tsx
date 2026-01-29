"use client";
import { useEffect, useState } from "react";

import { ChatMemberDto } from "@/entities/user/model/types";
import { useCreateChatStore } from "@/features/createChat/model/store"; // ФУНКЦИОНАЛ ДЛЯ ТЕСТА
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { Searchbar } from "@/shared/ui/searchbar";

import { getContacts } from "../api/getContacts";
import { ContactsList } from "./contactsList";

type ContactsSearchProps = {
  className?: string;
};

export const ContactsSearch: React.FC<ContactsSearchProps> = ({ className }) => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<ChatMemberDto[]>([]);
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

  // ФУНКЦИОНАЛ ДЛЯ ТЕСТА
  const contactsUids = contacts.map((el) => el.uid);
  const { updateData, formData } = useCreateChatStore();
  const handleAddToStore = () => {
    const currentUids = formData.uid_users_list || [];

    const updatedUids = Array.from(new Set([...currentUids, ...contactsUids]));

    updateData({ uid_users_list: updatedUids });
  };
  // ФУНКЦИОНАЛ ДЛЯ ТЕСТА

  return (
    <div className={cn("", className)}>
      <Searchbar value={search} onChange={setSearch} />
      <ContactsList contacts={contacts || []} />
      {/* ФУНКЦИОНАЛ ДЛЯ ТЕСТА */}
      <Button className="m-4" onClick={handleAddToStore}>
        Добавить в массив
      </Button>{" "}
      <p>Длина массива: {formData.uid_users_list.length}</p>
      {/* ФУНКЦИОНАЛ ДЛЯ ТЕСТА */}
    </div>
  );
};
