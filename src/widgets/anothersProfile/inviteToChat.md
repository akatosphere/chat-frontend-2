# Инструкция: Вкладка приглашения участников в чат

## Цель

Реализовать вкладку `"invite"` в профиле чата (`anothersProfile`), которая позволяет владельцу/администратору выбирать контакты из своего списка и приглашать их в текущий чат.

---

## 1. Добавить секцию в UIStore

**Файл:** [src/widgets/anothersProfile/model/anothersProfileUIStore.ts](src/widgets/anothersProfile/model/anothersProfileUIStore.ts)

Добавить `"invite"` к типу `activeSection` и сбросить в нём стор при необходимости:

```ts
// Было:
activeSection: "participants" | "media" | "files" | "voices" | "links";

// Стало:
activeSection: "participants" | "media" | "files" | "voices" | "links" | "invite";
```

Тип нужно обновить в двух местах в `AnothersProfileUIState`:

- поле `activeSection`
- аргумент функции `setActiveSection`

В `reset` начальное значение оставить `"participants"` — ничего менять не нужно.

---

## 2. Создать компонент вкладки

**Новый файл:** [src/widgets/anothersProfile/ui/tabs/invitePage.tsx](src/widgets/anothersProfile/ui/tabs/invitePage.tsx)

Компонент строится по образцу [src/widgets/createChat/ui/step2.tsx](src/widgets/createChat/ui/step2.tsx).

### Используемые компоненты и хуки

| Что использовать     | Откуда брать                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `useContactsSync`    | `@/entities/contact/lib/useContactsSync`                                                      |
| `useContactStore`    | `@/entities/contact/model/store`                                                              |
| `ContactCardFeature` | `@/features/contacts/ui/ContactCardFeature`                                                   |
| `useInfiniteScroll`  | `@/shared/lib/useInfiniteScroll`                                                              |
| `ContactsListEmpty`  | `@/shared/ui/contactsListEmpty`                                                               |
| `ListSeparator`      | `@/shared/ui/listSeparator`                                                                   |
| `NoSearchResults`    | `@/shared/ui/noSearchResults`                                                                 |
| `Searchbar`          | `@/shared/ui/searchbar`                                                                       |
| `useStep2Logic`      | `src/widgets/createChat/lib/useStep2Logic..ts` (обрати внимание на точку в конце имени файла) |

### Отличия от `Step2Widget`

- Компоненту нужно передать `chatKey` через props
- Вместо `<SubmitCreateChatBtn />` нужна собственная кнопка — **`<SubmitInviteBtn chatKey={chatKey} />`** (создать в `src/features/inviteToChat/ui/submitInviteBtn.tsx`)
- Кнопка вызывает другой API-запрос: не `createChat`, а запрос на добавление участников в существующий чат

### Структура компонента

```tsx
type InvitePageProps = {
  chatKey: string;
};

export const InvitePage: React.FC<InvitePageProps> = ({ chatKey }) => {
  const [search, setSearch] = useState("");
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useContactsSync();
  const { contacts, isInitialized } = useContactStore();
  const logic = useStep2Logic({ contacts, isInitialized, search });
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    isSearching: logic.isSearching,
    fetchNextPage,
  });

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <Searchbar value={search} onChange={setSearch} />
      <div className="scrollbar-hover flex h-full flex-col overflow-x-hidden overflow-y-auto">
        {/* тот же JSX, что в Step2Widget */}
      </div>
      <SubmitInviteBtn chatKey={chatKey} />
    </div>
  );
};
```

> `useStep2Logic` при монтировании автоматически вызывает `setIsSelecting(true)` из
> `useSelectContactsStore` (`@/features/contacts/model/SelectContactsStore`),
> поэтому `ContactCardFeature` сам покажет чекбоксы рядом с каждым контактом.

---

## 3. Создать кнопку подтверждения

**Новый файл:** [src/features/inviteToChat/ui/submitInviteBtn.tsx](src/features/inviteToChat/ui/submitInviteBtn.tsx)

По аналогии с [src/features/createChat/ui/submitCreateChatBtn.tsx](src/features/createChat/ui/submitCreateChatBtn.tsx):

- Читать выбранные контакты из `useSelectContactsStore` (`s.selected`)
- Собирать массив `systemUid` из выбранных контактов
- Вызывать API-запрос на добавление участников в чат (принимает `chatKey` + список uid)
- После успешного ответа:
  1. Вызвать `useSelectContactsStore.getState().reset()`
  2. Закрыть вкладку через `useAnothersProfileUIStore`:
     `setActiveSection("participants")` + `toggleIsMainActive()`

```tsx
type SubmitInviteBtnProps = {
  chatKey: string;
};

export const SubmitInviteBtn: React.FC<SubmitInviteBtnProps> = ({ chatKey }) => {
  const selected = useSelectContactsStore((s) => s.selected);
  const uids = selected.map((c) => c.systemUid);
  // ... вызов API и сброс состояния
};
```

---

## 4. Подключить вкладку в ChatProfileClient

**Файл:** [src/widgets/anothersProfile/ui/chatProfileClient.tsx](src/widgets/anothersProfile/ui/chatProfileClient.tsx)

Добавить импорт `InvitePage` и добавить её в объект `tabs`:

```ts
const tabs: Record<string, React.ReactNode> = {
  participants: <ParticipantsPage initialParticipants={initialParticipants} chatKey={chatKey} />,
  media: <MediaPage />,
  files: <FilesPage />,
  voices: <VoicesPage />,
  links: <LinksPage />,
  invite: <InvitePage chatKey={chatKey} />,  // добавить
};
```

---

## 5. Открывать вкладку по кнопке InviteToChatBtn

**Файл:** [src/features/inviteToChat/ui/inviteToChatBtn.tsx](src/features/inviteToChat/ui/inviteToChatBtn.tsx)

Кнопка уже существует и используется в `ParticipantsPage`. Сейчас она ничего не делает — нужно добавить обработчик `onClick`:

```tsx
const setActiveSection = useAnothersProfileUIStore((s) => s.setActiveSection);
const toggleIsMainActive = useAnothersProfileUIStore((s) => s.toggleIsMainActive);

const handleClick = () => {
  setActiveSection("invite");
  toggleIsMainActive();
};
```

---

## Итоговая схема зависимостей

```
InviteToChatBtn (features/inviteToChat/ui)
  └─ onClick → setActiveSection("invite") + toggleIsMainActive()
               [useAnothersProfileUIStore]

ChatProfileClient (widgets/anothersProfile/ui)
  └─ tabs["invite"] → <InvitePage chatKey={chatKey} />

InvitePage (widgets/anothersProfile/ui/tabs)
  ├─ useStep2Logic      → фильтрация контактов + setIsSelecting(true)
  ├─ ContactCardFeature → карточка контакта с чекбоксом
  └─ SubmitInviteBtn    → API-запрос на добавление участников
```
