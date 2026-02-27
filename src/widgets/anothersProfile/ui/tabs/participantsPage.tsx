import { useMemo, useState } from "react";

import { useParticipantsSync } from "@/entities/chat/lib/useParticipantsSync";
import { ChatParticipantListResponse } from "@/entities/chat/model/types";
import { useParticipantsStore } from "@/entities/chat/model/useParticipantsStore";
import { ContactCard } from "@/entities/contact/ui/contactCard";
import { InviteToChatBtn } from "@/features/inviteToChat/ui/inviteToChatBtn";
import { useInfiniteScroll } from "@/shared/lib/useInfiniteScroll";
import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { filterParticipants } from "../../lib/filterParticipants";

type ParticipantsPageProps = {
  className?: string;
  chatKey: string;
  initialParticipants: ChatParticipantListResponse | null;
  chatType: "group" | "channel" | "chat";
  canInvite: boolean;
};

export const ParticipantsPage: React.FC<ParticipantsPageProps> = ({
  className,
  initialParticipants,
  chatKey,
  chatType,
  canInvite,
}) => {
  const [search, setSearch] = useState("");
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useParticipantsSync(
    chatKey,
    initialParticipants,
  );

  const participants = useParticipantsStore((s) => s.participants);
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  const filtered = useMemo(() => filterParticipants(participants, search), [participants, search]);

  return (
    <div className="flex w-full flex-col p-2">
      <div className="flex w-full flex-col items-start gap-4 p-2">
        {canInvite && <InviteToChatBtn chatType={chatType} />}
        <Searchbar className="w-full" value={search} onChange={setSearch} />
      </div>
      {search ? (
        filtered.map((p, index) => (
          <div className={cn("", className)} key={index}>
            <ContactCard contact={p} isLast={index === filtered.length - 1} />
          </div>
        ))
      ) : (
        <>
          {participants.length > 0 && (
            <>
              <p className="text-gray minitext p-3">Владелец</p>
              <div className={cn("", className)}>
                <ContactCard contact={participants[0]} isLast={participants.length === 1} />
              </div>
            </>
          )}
          {participants.length > 1 && (
            <>
              <p className="text-gray minitext p-3">
                {chatType === "group" ? "Участники" : "Подписчики"}
              </p>
              {participants.slice(1).map((p, index) => (
                <div className={cn("", className)} key={index + 1}>
                  <ContactCard contact={p} isLast={index + 1 === participants.length - 1} />
                </div>
              ))}
            </>
          )}
        </>
      )}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex flex-col justify-center py-4">
          {isFetchingNextPage && <p className="text-sm text-gray-400">Загрузка...</p>}
        </div>
      )}
    </div>
  );
};
