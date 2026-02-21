import { useParticipantsSync } from "@/entities/chat/lib/useParticipantsSync";
import { ChatParticipantListResponse } from "@/entities/chat/model/types";
import { useParticipantsStore } from "@/entities/chat/model/useParticipantsStore";
import { ContactCard } from "@/entities/contact/ui/contactCard";
import { useInfiniteScroll } from "@/shared/lib/useInfiniteScroll";
import { cn } from "@/shared/shadcn/lib/utils";

type ParticipantsPageProps = {
  className?: string;
  chatKey: string;
  initialParticipants: ChatParticipantListResponse | null;
};

export const ParticipantsPage: React.FC<ParticipantsPageProps> = ({
  className,
  initialParticipants,
  chatKey,
}) => {
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
  return (
    <div className="flex w-full flex-col p-2">
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
          <p className="text-gray minitext p-3">Участники</p>
          {participants.slice(1).map((p, index) => (
            <div className={cn("", className)} key={index + 1}>
              <ContactCard contact={p} isLast={index + 1 === participants.length - 1} />
            </div>
          ))}
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
