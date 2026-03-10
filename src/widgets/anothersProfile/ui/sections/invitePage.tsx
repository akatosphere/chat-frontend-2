import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

import { addMembersToChat } from "@/entities/chat/api/addMemberToChat";
import { useChatInfoStore } from "@/entities/chat/model/useChatInfoStore";
import { useChatStore } from "@/entities/chat/model/useChatStore";
import { useContactsSync } from "@/entities/contact/lib/useContactsSync";
import { useContactStore } from "@/entities/contact/model/store";
import { useSelectContactsStore } from "@/features/contacts/model/SelectContactsStore";
import { ContactCardFeature } from "@/features/contacts/ui/ContactCardFeature";
import { InviteToChatBtn } from "@/features/inviteToChat/ui/inviteToChatBtn";
import { useInfiniteScroll } from "@/shared/lib/useInfiniteScroll";
import { ContactsListEmpty } from "@/shared/ui/contactsListEmpty";
import { ListSeparator } from "@/shared/ui/listSeparator";
import { NoSearchResults } from "@/shared/ui/noSearchResults";
import { Searchbar } from "@/shared/ui/searchbar";

import { useInvitePageLogic } from "../../lib/useInvitePageLogic";
import { useAnothersProfileUIStore } from "../../model/anothersProfileUIStore";

type InvitePageProps = {
  className?: string;
};

export const InvitePage: React.FC<InvitePageProps> = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useContactsSync();
  const { contacts, isInitialized } = useContactStore();
  const chatKey = useChatStore((s) => s.chatKey);
  const selectedContacts = useSelectContactsStore(useShallow((s) => s.selected));
  const setActiveSection = useAnothersProfileUIStore((s) => s.setActiveSection);

  const logic = useInvitePageLogic({
    contacts,
    isInitialized,
    search,
  });
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    isSearching: logic.isSearching,
    fetchNextPage,
  });

  const handleInvite = async () => {
    if (!chatKey || selectedContacts.length === 0) return;

    setIsLoading(true);
    try {
      const response = await addMembersToChat({
        chat_key: chatKey,
        uid_users_list: selectedContacts.map((c) => c.systemUid),
      });

      const addedCount = response.added_users.length;

      // Инвалидируем query-кэш участников, чтобы при следующем маунте данные рефетчились с сервера
      await queryClient.invalidateQueries({ queryKey: ["participants", chatKey] });

      useChatInfoStore.getState().patchChatInfo(chatKey, {
        membersCount:
          (useChatInfoStore.getState().chatInfoByKey[chatKey]?.membersCount ?? 0) + addedCount,
      });

      setActiveSection("main");
    } catch {
      alert("Ошибка при добавлении пользователей");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between gap-4 p-4">
      <Searchbar value={search} onChange={setSearch} />
      <div className="scrollbar-hover flex h-full flex-col overflow-x-hidden overflow-y-auto">
        {logic.showLocalContacts && (
          <div className="flex flex-col gap-2">
            <ListSeparator text="Мои контакты" />
            {logic.filteredLocalContacts.map((c, index) => {
              return <ContactCardFeature contact={c} key={index} />;
            })}
          </div>
        )}
        {!logic.isSearching && hasNextPage && (
          <div ref={loadMoreRef} className="flex justify-center py-4">
            {isFetchingNextPage && <p className="text-sm text-gray-400">Загрузка...</p>}
          </div>
        )}
        {logic.showNoResults && (
          <div className="flex flex-1 items-center justify-center">
            <NoSearchResults />
          </div>
        )}
        {logic.isInitialEmpty && (
          <div className="flex flex-1 items-center justify-center">
            <ContactsListEmpty />
          </div>
        )}
      </div>
      <InviteToChatBtn disabled={!logic.isSelected} isLoading={isLoading} onClick={handleInvite} />
    </div>
  );
};
