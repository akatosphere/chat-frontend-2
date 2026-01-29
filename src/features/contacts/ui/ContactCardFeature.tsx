"use client";

import { mapToAddByPhonePayload } from "@/entities/contact/model/mappers";
import { Contact } from "@/entities/contact/model/types";
import { ContactCard } from "@/entities/contact/ui/contactCard";
import { Checkbox } from "@/shared/ui/checkBox";

import { useAddToContacts } from "../addToContacts/lib/useAddToContacts";
import { useSelectContactsStore } from "../model/SelectContactsStore";

type ContactCardFeatureProps = {
  contact: Contact;
};

export const ContactCardFeature: React.FC<ContactCardFeatureProps> = ({ contact }) => {
  const isSelecting = useSelectContactsStore((s) => s.isSelecting);
  const toggleContact = useSelectContactsStore((s) => s.toggleContact);
  const { mutate } = useAddToContacts(); // ФУНКЦИОНАЛ ДЛЯ ТЕСТА
  const isChecked = useSelectContactsStore((s) =>
    s.selected.some((item) => item.uid === contact.uid),
  );

  const handleAction = () => {
    if (isSelecting) {
      toggleContact(contact);
    } else {
      const payload = mapToAddByPhonePayload(contact); // ФУНКЦИОНАЛ ДЛЯ ТЕСТА
      mutate(payload); // ФУНКЦИОНАЛ ДЛЯ ТЕСТА
      // Здесь будет логика перехода в чат, когда режим выбора выключен
      console.log("Переход в чат с", contact.fullName);
    }
  };

  return (
    <ContactCard
      contact={contact}
      onClick={handleAction}
      after={isSelecting && <Checkbox checked={isChecked} />}
    />
  );
};
