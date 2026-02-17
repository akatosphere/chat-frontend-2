"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { InfoItem } from "@/shared/ui/infoItems/infoItem";
import { useInviteLink } from "@/widgets/anothersProfile/lib/useInviteLink";

import { MappedChatDetails } from "../lib/mapChat";

type ChatInfoListProps = {
  className?: string;
  initialData: MappedChatDetails | null;
  isOwner: boolean;
};

export const ChatInfoList: React.FC<ChatInfoListProps> = ({ className, initialData, isOwner }) => {
  const description = initialData?.description;
  const { data, isLoading, isError } = useInviteLink(initialData?.chatKey);
  const inviteLink = isOwner
    ? isLoading
      ? "..."
      : isError
        ? "ошибка генерации пригласительной ссылки"
        : data?.invite_link
    : "";

  return (
    <div className="flex w-full flex-col gap-2">
      <div className={cn("flex w-full flex-col rounded-lg bg-white", className)}>
        {description && <InfoItem title="Описание" text={description} className="text-black" />}
      </div>
      <div className={cn("flex w-full flex-col rounded-lg bg-white", className)}>
        {isOwner && (
          <InfoItem
            copy={true}
            title="ссылка на приглашение"
            text={inviteLink}
            className={cn(data?.invite_link ? "text-primary" : "text-black")}
          />
        )}
      </div>
    </div>
  );
};
