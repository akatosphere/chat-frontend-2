"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { InfoItem } from "@/shared/ui/infoItems/infoItem";

import { MappedChatDetails } from "../lib/mapChat";

type ChatInfoListProps = {
  className?: string;
  initialData: MappedChatDetails | null;
};

export const ChatInfoList: React.FC<ChatInfoListProps> = ({ className, initialData }) => {
  const description = initialData?.description;
  const inviteLink = "https:///link";

  return (
    <div className="flex w-full flex-col gap-2">
      <div className={cn("flex w-full flex-col rounded-lg bg-white", className)}>
        {description && <InfoItem title="Описание" text={description} className="text-black" />}
      </div>
      <div className={cn("flex w-full flex-col rounded-lg bg-white", className)}>
        {inviteLink && (
          <InfoItem title="ссылка на приглашение" text={inviteLink} className="text-black" />
        )}
      </div>
    </div>
  );
};
