# ChatWidget Documentation

## TODO

- Добавить пагинацию с бесконечным скроллом
- Адаптировать чат под разные типы group/chanel/user
- Решить проблему с миганием скролла(пока поставил заглушку в виде loader в MessageList.tsx на 50мс)

## Дерево файлов

```
features/chat/
├── chat/
│   ├── ui/
│   │   ├── chat.tsx              # Основной компонент чата
│   │   ├── messageList.tsx       # Список сообщений
│   │   ├── messageGroup.tsx      # Группа сообщений по дате
│   │   ├── messageBubble.tsx     # Пузырь отдельного сообщения
│   │   ├── dateBage.tsx          # Бейдж даты
│   │   └── scrollDownBtn.tsx     # Кнопка прокрутки вниз
│   ├── model/
│   │   ├── store/
│   │   │   └── useChatStore.ts   # Zustand store состояния чата
│   │   ├── types/
│   │   │   ├── serverTypes.ts    # Типы данных с сервера
│   │   │   └── mappedTypes.ts    # Преобразованные UI типы
│   │   └── mapper.ts             # Функции маппинга типов
│   ├── lib/
│   │   ├── constants.ts          # Конфигурация автопрочтения
│   │   ├── getMessageByDate.ts   # Группировка сообщений по дате
│   │   └── getMessageMarginTop.ts # Расчет отступов между сообщениями
│   └── hooks/
│       ├── useSendMessage.ts     # Хук отправки сообщений
│       ├── useAutoRead.ts        # Хук автопрочтения сообщений
│       ├── useMessageScroll.ts   # Хук управления прокруткой
│       └── index.ts              # Экспорт хуков
└── app/chats/[chatKey]/
    └── page.tsx              # Страница чата

widgets/chat/chatWidget
├── chatWidget.tsx                # Виджет с чатом
entities/chat/
├── api/
│   ├── getMessages.ts            # API загрузки сообщений
│   ├── sendMessage.ts            # API отправки сообщения
│   ├── sendReadStatus.ts         # API статуса прочтения
│   └── addMemberToChat.ts        # API добавления участников

```

## Общее описание

ChatWidget — это React-компонент системы мгновенных сообщений, разработанный для Next.js приложения. Виджет обеспечивает полнофункциональный интерфейс для обмена сообщениями в реальном времени через WebSocket соединение, с поддержкой групповых чатов, каналов и личных сообщений.

## Архитектура

Архитектура построена на принципах Feature-Sliced Design (FSD), где весь код чата организован в директории features/chat. Система использует централизованное состояние через Zustand, WebSocket соединение для real-time обновлений и интуитивный пользовательский интерфейс с автоматическим прочтением сообщений, группировкой по датам и адаптивной прокруткой.

---

## Основные компоненты

### ChatPage (Страница чата)

Точка входа для отображения чата. Это асинхронный серверный компонент Next.js, который загружает информацию о чате и начальные сообщения, после чего рендерит ChatWidget. Компонент извлекает chatKey из URL параметров, получает данные чата через getChatServer API, загружает последние 50 сообщений через getMessages, преобразует их в удобный формат через mapChatMessages и передает всё в ChatWidget.

### ChatWidget (Виджет чата)

Главный контейнер чата, объединяющий заголовок, основную область сообщений и подвал. Компонент отвечает за отображение информации о чате (название, аватар, количество участников), управление модальным окном добавления участников, передачу данных в дочерний компонент Chat и применение CSS классов для адаптивности. Поддерживает личные чаты, групповые чаты и каналы, автоматически определяя тип и отображая соответствующую информацию в заголовке.

### Chat (Основной компонент чата)

Центральный компонент, управляющий отображением списка сообщений и футера с полем ввода. Использует Zustand store (useChatStore) для управления состоянием сообщений и WebSocket соединением. При монтировании инициализирует WebSocket соединение для получения новых сообщений в реальном времени, управляет жизненным циклом соединения и очищает ресурсы при размонтировании компонента. Визуально состоит из MessageList (список сообщений) и ChatFooter (панель ввода сообщения).

### MessageList (Список сообщений)

Компонент для отображения сгруппированных сообщений с поддержкой автоматического скролла и автопрочтения. Сообщения группируются по дате с помощью функции groupMessagesByDate, каждая группа отображается через компонент MessageGroup. Поддерживает состояния загрузки и пустого списка сообщений, имеет кнопку прокрутки вниз при наличии непрочитанных сообщений. Использует хуки useMessageScroll для управления прокруткой и useAutoRead для автоматической отметки сообщений как прочитанных при появлении в области видимости.

### MessageGroup (Группа сообщений)

Компонент для отображения связанных сообщений одного пользователя, полученных в определенный день. Принимает массив сообщений, идентификатор текущего пользователя и метку даты, рендерит DateBadge с датой и MessageBubble для каждого сообщения. Определяет отступы между сообщениями через getMessageMarginTop, чтобы группировать сообщения одного пользователя визуально.

### MessageBubble (Пузырь сообщения)

Атомарный компонент для отображения отдельного сообщения. Автоматически определяет, является ли сообщение отправителя текущим пользователем, применяя соответствующие стили (выравнивание справа/слева, цвет фона). Отображает время отправки, статус доставки (pending, delivered, read, failed) через компонент StatusIcon, поддерживает длинные сообщения с переносом строк и адаптивную ширину до 500px на десктопах. Использует React.memo для оптимизации производительности.

### DateBadge (Дата)

Компонент-разделитель для отображения даты группы сообщений. Показывает "Сегодня", "Вчера" или полную дату (день месяц год) в зависимости от близости к текущей дате. Использует date-fns для форматирования и локализации на русский язык.

### ScrollDownBtn (Кнопка прокрутки)

Кнопка с иконкой стрелки вниз для быстрой прокрутки к последним сообщениям. Появляется автоматически, когда пользователь прокрутил вверх и находится не внизу списка. Имеет анимацию появления/скрытия и стили для плавного взаимодействия.

---

## Управление состоянием

### useChatStore (Zustand)

Централизованное хранилище состояния чата, управляющее следующими данными: messages — массив всех сообщений текущего чата, currentUserId — идентификатор текущего пользователя, chatKey — ключ текущего чата, isReady — флаг готовности к отображению, unsubscribeWs — функция отписки от WebSocket.

**Экшены хранилища:**

- setInitialData(messages, currentUserId, chatKey) — инициализация хранилища при первом рендере, устанавливает сообщения, ID пользователя и ключ чата, переводит store в состояние готовности
- addMessage(message) — добавление нового сообщения в массив с проверкой на дубликаты по uid и requestUid для временных сообщений
- updateMessageStatus(uid, status) — обновление статуса доставки сообщения (pending, delivered, read, failed)
- markAsRead(uid) — отметка сообщения как прочитанного через изменение флага isNew на false
- setFailedStatus(requestUid) — установка статуса failed для сообщения, отправка которого не удалась
- initializeWebSocket(chatKey) — подключение к WebSocket с подпиской на события: create_text_message (новые сообщения) и change_status_read_message (изменение статуса прочтения)
- disconnectWebSocket() — отключение от WebSocket и очистка подписки

**WebSocket обработчики:**

При получении нового сообщения через WebSocket происходит поиск временного сообщения по requestUid для замены на реальное с сервера, обновление статуса доставки на delivered и добавление нового сообщения в список. При изменении статуса прочтения сообщения обновляется флаг isNew для соответствующего сообщения.

---

## Хуки

### useSendMessage

Хук для отправки текстовых сообщений. Создает временное сообщение с uid, requestUid и статусом pending, добавляет его в локальное состояние через addMessage, отправляет запрос на сервер через sendTextMessage API, при успехе заменяет временное сообщение на реальное со статусом delivered, при ошибке устанавливает статус failed и обновляет временное сообщение. Возвращает коллбэк function(text) для использования в UI.

### useAutoRead

Хук для автоматического отмечания сообщений как прочитанных при их появлении в области видимости. Использует IntersectionObserver для отслеживания видимости элементов с атрибутами data-message-uid, data-chat-key, data-is-from-current-user, data-is-new. Собирает идентификаторы сообщений в очередь и отправляет batch запросы на сервер через sendReadStatus API с задержкой 150ms для группировки. Обрабатывает ошибки и логирует их в консоль. Игнорирует сообщения от текущего пользователя и уже прочитанные сообщения.

### useMessageScroll

Хук для управления прокруткой списка сообщений. Обеспечивает автоматическую прокрутку к последнему сообщению при инициализации и при получении новых сообщений, если пользователь находится внизу списка. Отслеживает позицию скролла через onScroll обработчик, определяет находится ли пользователь внизу через isAtBottom. Поддерживает прокрутку к непрочитанным сообщениям при первом входе в чат. Использует ref на контейнер скролла для программного управления позицией.

---

## Маппинг типов

### serverTypes (Типы с сервера)

Интерфейсы, описывающие структуру данных, приходящих с сервера:

- UserProfile — профиль пользователя с uid, username, nickname, first_name, last_name, patronymic, avatar, avatar_url, avatar_webp, avatar_webp_url
- MessageFile — файл сообщения с id, uid, file, file_url, file_webp, file_type, new, created_at, updated_at
- RepliedMessage — ответ на сообщение с id, uid, from_user, content, files_list
- ForwardedMessage — пересланное сообщение с id, uid, from_user, content, files_list, first_name, last_name
- ChatMessage — основная структура сообщения с id, uid, from_user, to_user, content, replied_messages, forwarded_messages, files_list, new, created_at, updated_at, chat_id, chat_key, chat_type, message_rtc
- ChatMessageUI — расширение ChatMessage для UI с необязательными status и request_uid
- ChatMessageList — структура пагинированного списка сообщений с count, next, previous, results
- Chat — структура чата с chat (профиль), id, is_active, is_favorite, notifications, message_count, file_count, new_message_count, new_file_count, last_message, name, chat_type, chat_key, description, participants, created_at, updated_at

### mappedTypes (UI типы)

Преобразованные типы для использования в компонентах с camelCase именованием свойств:

- MappedChatMessage — сообщение с fromUser, toUser, repliedMessages, forwardedMessages, filesList, isNew, createdAt, updatedAt, chatId, chatKey, chatType, messageRtc, status, requestUid
- MappedMessageUser — пользователь с firstName, lastName, patronymic, avatarUrl, avatarWebpUrl
- MappedMessageFile — файл с fileUrl, fileWebp, fileWebpUrl, fileType, isNew, createdAt, updatedAt
- MappedRepliedMessage и MappedForwardedMessage — аналогичные структуры для ответов и пересланных сообщений

### Мапперы

Функции преобразования из serverTypes в mappedTypes:

- mapUserProfile(user) — преобразует UserProfile в MappedMessageUser
- mapMessageFile(file) — преобразует MessageFile в MappedMessageFile
- mapRepliedMessage(message) — преобразует RepliedMessage в MappedRepliedMessage
- mapForwardedMessage(message) — преобразует ForwardedMessage в MappedForwardedMessage
- mapChatMessage(message) — преобразует ChatMessage в MappedChatMessage
- mapChatMessages(messages) — применяет mapChatMessage к массиву сообщений

---

## API функции

### getMessages

Загрузка сообщений с сервера. Принимает параметры user_uid, from_me, new, ordering, page, page_size, search, range_time_start_created, range_time_end_created, range_time_start_updated, range_time_end_updated. Возвращает Result<ChatMessageList> с success и data или error.

### sendTextMessage

Отправка текстового сообщения через WebSocket. Принимает chat_key или to_user_uid, content, files, replied_messages, forwarded_messages, status (publish или draft), request_uid. Возвращает ChatMessage с сервера. Требует указать либо chat_key для групповых чатов, либо to_user_uid для личных сообщений.

### sendReadStatus

Отправка статуса прочтения сообщения. Принимает chatKey и idOrUid. Использует WebSocket для отправки запроса change_status_read_message с параметрами chat_key, id_or_uid, new_read_status: false.

### addMembersToChat

Добавление участников в чат. Принимает chat_key и массив uid_users_list. Возвращает chat_key, chat_type и массив добавленных пользователей с uid и full_name.

---

## Вспомогательные функции

### groupMessagesByDate(messages)

Группирует сообщения по дате. Сортирует сообщения по createdAt, создает Map с ключом формата "yyyy-MM-dd", возвращает массив объектов с id, date, label и messages. Label формируется как "Сегодня", "Вчера", "d MMMM yyyy" или "d MMMM" в зависимости от даты.

### getMessageMarginTop(current, previous)

Определяет CSS класс отступа между сообщениями. Возвращает "mt-0" для первого сообщения, "mt-2 desktop:mt-3" если отправитель изменился, "mt-0.5 desktop:mt-2" для сообщений одного отправителя подряд.

### getMessageStatus(isNew, status)

Определяет визуальный статус иконки сообщения на основе флага isNew и статуса status.

---

## Зависимости

### Внешние библиотеки

- React и React DOM — UI фреймворк
- Next.js — React фреймворк для серверного рендеринга
- Zustand — управление состоянием
- date-fns — работа с датами и локализация
- uuid — генерация уникальных идентификаторов

### Внутренние модули

- @/shared/api/wsClient — WebSocket клиент
- @/shared/api/getApiServer — API клиент
- @/shared/constants/constants — константы WebSocket действий
- @/shared/shadcn/lib/utils — утилита cn для CSS классов
- @/shared/ui/infoMessage — компонент информационного сообщения
- @/entities/chat/api/\* — API функции чата
- @/widgets/activeChatHeader/ui/chatHeader — заголовок чата

---

## Поток данных

При инициализации ChatPage происходит извлечение chatKey из URL, загрузка данных чата и сообщений с сервера, преобразование типов через мапперы и передача данных в ChatWidget. ChatWidget рендерит ChatHeader с информацией о чате и компонент Chat.

Chat при монтировании инициализирует Zustand store через setInitialData и устанавливает WebSocket подписку через initializeWebSocket. WebSocket обработчик слушает события create_text_message для новых сообщений и change_status_read_message для изменения статуса прочтения.

При отправке сообщения useSendMessage создает временное сообщение, добавляет его локально, отправляет на сервер и обновляет статус при успехе или устанавливает failed при ошибке.

При прокрутке useMessageScroll отслеживает позицию и управляет скроллом. При появлении нового сообщения в области видимости useAutoRead автоматически отправляет статус прочтения на сервер через батчинг для оптимизации.

---

## Конфигурация

### AUTO_READ_CONFIG

- BATCH_DELAY: 150 — задержка перед отправкой batch запроса на прочтение в миллисекундах
- READ_THRESHOLD: 0.1 — порог видимости элемента для IntersectionObserver (10%)
- READ_ROOT_MARGIN: "50px" — отступ от границ контейнера
- SCROLL_BEHAVIOR: "auto" — поведение прокрутки
- TOP_OFFSET: 16 — верхний отступ при прокрутке

---

---

## Модель данных

### MappedChatMessage

```typescript
{
  id: number | null,
  uid: string,
  fromUser: MappedMessageUser,
  toUser: MappedMessageUser | null,
  content: string,
  repliedMessages: MappedRepliedMessage[],
  forwardedMessages: MappedForwardedMessage[],
  filesList: MappedMessageFile[],
  isNew: boolean,
  createdAt: number,
  updatedAt: number,
  chatId: string | null,
  chatKey: string,
  chatType: ChatType,
  messageRtc: CallInfo | null,
  status?: SendingStatus,        // UI только
  requestUid?: string            // UI только
}
```

### ChatType

```typescript
"public-group" | "private-group" | "public-channel" | "private-channel" | "channel";
```

### SendingStatus

```typescript
"pending" | "delivered" | "failed" | "read";
```

---

## Особенности реализации

### Производительность

Компоненты MessageBubble и MessageGroup обернуты в React.memo для предотвращения лишних рендеров. Используется useMemo для вычислений времени, форматирования и группировки сообщений. IntersectionObserver и batch запросы минимизируют нагрузку на сервер при автопрочтении.

### Обработка ошибок

При ошибках отправки сообщения устанавливается статус failed с визуальной индикацией. Ошибки WebSocket и API логируются в консоль. При неудаче addMembersToChat выводится сообщение об ошибке.

### Адаптивность

Используются desktop: префиксы для десктопных стилей. Компонент адаптируется под разные размеры экрана. Поддерживается полноэкранный и виджетный режимы отображения.

### Real-time обновления

WebSocket соединение устанавливается при монтировании Chat и разрывается при размонтировании. Обрабатываются события новых сообщений и изменения статуса прочтения. Статус доставки обновляется при получении подтверждения с сервера.
