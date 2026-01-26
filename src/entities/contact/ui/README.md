### ContactCard - базовая карточка контакта

Созданные файлы:

### `src/entities/contact/model/types.ts`

Типы ContactUser и ContactItem для данных контактов. Добавлено поле status_text для текста "был(а) ...".

### `src/entities/contact/ui/contactCard.tsx`

Основной компонент карточки. Аватар (буква или фото), имя, текстовый статус. Без hover/active состояний.

### `src/shared/ui/list/simpleCard.tsx`

Базовая карточка для списков. Разделители, ссылки, минимальные стили.

### `app/(test)/simple-card-test/page.tsx`

Тестовая страница для проверки компонента.

Использование:

```tsx
<ContactCard contact={contact} href="/contacts/1" />
```
