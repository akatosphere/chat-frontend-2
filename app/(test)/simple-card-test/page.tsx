"use client";

import { ContactItem } from "@/entities/contact/model/types";
import { ContactCard } from "@/entities/contact/ui/contactCard";

const mockContacts: ContactItem[] = [
  {
    id: 1,
    user: {
      uid: "user-1",
      first_name: "Влад",
      last_name: "Ляшев",
      avatar_url: "",
      avatar_webp_url: "",
      is_online: true,
      was_online_at: Date.now() / 1000 - 300,
    },
    is_favorite: true,
    last_seen_at: Date.now() / 1000 - 300,
  },
  {
    id: 2,
    user: {
      uid: "user-2",
      first_name: "Алексей",
      last_name: "Митрофанов",
      avatar_url: "",
      avatar_webp_url: "",
      is_online: false,
      was_online_at: Date.now() / 1000 - 3600,
    },
    is_favorite: false,
    last_seen_at: Date.now() / 1000 - 3600,
  },
  {
    id: 3,
    user: {
      uid: "user-3",
      first_name: "Анастасия",
      last_name: "Бортникова",
      avatar_url: "https://i.pravatar.cc/150?img=3",
      avatar_webp_url: "https://i.pravatar.cc/150?img=3",
      is_online: true,
      was_online_at: Date.now() / 1000 - 60,
    },
    is_favorite: false,
    last_seen_at: Date.now() / 1000 - 60,
  },
];

export default function SimpleCardTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Чистая карточка контакта</h1>

        <div className="rounded-lg bg-white">
          {mockContacts.map((contact, index) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              href={`/contacts/${contact.id}`}
              isLast={index === mockContacts.length - 1}
            />
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <p className="mb-2">Что содержит карточка:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Аватар</strong> - буква имени если нет фото, фото если есть URL
            </li>
            <li>
              <strong>Имя контакта</strong> - first_name + last_name
            </li>
            <li>
              <strong>Подпись</strong> - username (если есть)
            </li>
            <li>
              <strong>Разделительные линии</strong> между элементами
            </li>
            <li>
              <strong>НЕТ hover эффектов</strong>
            </li>
            <li>
              <strong>НЕТ активного состояния</strong>
            </li>
            <li>
              <strong>НЕТ индикатора онлайн</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
