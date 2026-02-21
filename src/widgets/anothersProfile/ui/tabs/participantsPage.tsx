import { useParticipantsSync } from "@/entities/chat/lib/useParticipantsSync";
import { ChatParticipantListResponse } from "@/entities/chat/model/types";
import { useParticipantsStore } from "@/entities/chat/model/useParticipantsStore";
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
    <>
      {participants.map((p, index) => (
        <div className={cn("", className)} key={index}>
          {p.fullName}
        </div>
      ))}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex flex-col justify-center py-4">
          {isFetchingNextPage && <p className="text-sm text-gray-400">Загрузка...</p>}
        </div>
      )}
    </>
  );
};
