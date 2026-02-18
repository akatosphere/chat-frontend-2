import { ChatType } from "@/features/chat/chat/model/types/serverTypes";
import { SimpleCard } from "@/shared/ui/list/simpleCard";
import { Statusbar } from "@/shared/ui/statusbar/ui/statusbar";

import { Contact } from "../model/types";

export type ContactCardProps = {
  contact: Contact;
  isLast?: boolean;
  onClick?: () => void;
  after?: React.ReactNode;
};

export const ContactCard = (props: ContactCardProps) => {
  const { contact, isLast = false, onClick, after } = props;

  const avatarLetter = contact.firstName?.charAt(0).toUpperCase() || "?";
  const href = `/chats/${contact.systemUid}`;

  return (
    <SimpleCard href={href} isLast={isLast} onClick={onClick} className="w-full justify-between">
      <div className="flex gap-3">
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

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="subtext desktop:text max-w-50 min-w-0 truncate font-semibold text-black">
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
