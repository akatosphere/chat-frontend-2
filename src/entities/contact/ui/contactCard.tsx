import { ChatParticipant } from "@/entities/chat/model/types";
import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { cn } from "@/shared/shadcn/lib/utils";
import { SimpleCard } from "@/shared/ui/list/simpleCard";
import { Statusbar } from "@/shared/ui/statusbar/ui/statusbar";

import { Contact } from "../model/types";

export type ContactCardProps = {
  contact: Contact | ChatParticipant;
  isLast?: boolean;
  onClick?: () => void;
  after?: React.ReactNode;
};

export const ContactCard = (props: ContactCardProps) => {
  const { contact, isLast = false, onClick, after } = props;

  const avatarLetter = contact.firstName?.charAt(0).toUpperCase() || "?";
  const href = "systemUid" in contact ? `/chats/${contact.systemUid}` : `/chats/${contact.uid}`;
  return (
    <SimpleCard href={href} onClick={onClick} className="w-full justify-between">
      <div className="flex w-full gap-3">
        {/* Аватар с буквой */}
        <div className="shrink-0">
          <div className="bg-gray-tone flex h-12 w-12 items-center justify-center rounded-full">
            {contact.avatarUrl ? (
              <img
                src={contact.avatarUrl}
                alt={contact.fullName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="text-primary text-lg font-medium">{avatarLetter}</span>
            )}
          </div>
        </div>

        {/* Текстовая информация */}
        <div
          className={cn(
            "after:bg-gray relative flex min-w-0 flex-1 flex-col justify-center after:absolute after:top-[calc(100%+10px)] after:right-0 after:left-0 after:h-px after:opacity-15 after:content-['']",
            isLast && "after:hidden",
          )}
        >
          {/* Имя */}
          <h3 className="subtext desktop:text max-w-50 min-w-0 truncate font-semibold text-gray-900">
            {contact.fullName}
          </h3>

          <Statusbar
            isOnline={contact.isOnline}
            chatType={"direct" as ChatType}
            time={contact.lastSeenAt} //
          />
        </div>
      </div>
      {after && <div className="flex shrink-0 items-center justify-center">{after}</div>}
    </SimpleCard>
  );
};
