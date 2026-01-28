"use client";

import { useState } from "react";

// import { mapToAddByPhonePayload } from "@/entities/contact/model/mappers";
import { Contact } from "@/entities/contact/model/types";
import { ContactCard } from "@/entities/contact/ui/contactCard";
import { Checkbox } from "@/shared/ui/checkBox";

// import { useAddToContacts } from "../lib/useAddToContacts";

type ContactCardFeatureProps = {
  contact: Contact;
};

export const ContactCardFeature: React.FC<ContactCardFeatureProps> = ({ contact }) => {
  // 2. Инициализируем мутацию через хук
  // const { mutate, isPending } = useAddToContacts();
  const [selected, setSelected] = useState(false);

  // Тестовая функция добавления в контакты
  // const handleClick = () => {
  //   if (isPending) return;

  //   // 3. Маппим данные контакта в формат, который ждет API (payload)
  //   const payload = mapToAddByPhonePayload(contact);

  //   // 4. Запускаем выполнение
  //   mutate(payload);
  // };

  const toggleSelect = () => {
    setSelected((prev) => !prev);
  };

  return (
    <ContactCard contact={contact} onClick={toggleSelect} after={<Checkbox checked={selected} />} />
  );
};
