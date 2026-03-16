"use client";

import { ChatParticipant } from "@/entities/chat/model/types";
import { ContactCard } from "@/entities/contact/ui/contactCard";
import { cn } from "@/shared/shadcn/lib/utils";

import { useParticipantContextMenu } from "../lib/useParticipantContextMenu";

type ParticipantCardProps = {
  participant: ChatParticipant;
  chatKey: string;
  isLast: boolean;
  isOwner: boolean;
  className?: string;
  chatType: "group" | "channel" | "chat";
};

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  chatKey,
  isLast,
  isOwner,
  className,
  chatType,
}) => {
  const { onContextMenu } = useParticipantContextMenu({ participant, chatKey, chatType });

  return (
    <div className={cn("", className)} onContextMenu={isOwner ? onContextMenu : undefined}>
      <ContactCard contact={participant} isLast={isLast} />
    </div>
  );
};
