import { cn } from "@/shared/shadcn/lib/utils";
import { SimpleCard } from "@/shared/ui/list/simpleCard";

import { Contact } from "../model/types";

export type ContactCardProps = {
  contact: Contact;
  href?: string;
  isLast?: boolean;
  onClick?: () => void;
  after?: React.ReactNode;
};

export const ContactCard = (props: ContactCardProps) => {
  const { contact, href, isLast = false, onClick, after } = props;
  const avatarLetter = contact.firstName?.charAt(0).toUpperCase() || "?";

  return (
    <SimpleCard href={href} isLast={isLast} onClick={onClick} className="w-full justify-between">
      <div className="flex gap-3">
        {/* Аватар с буквой */}
        <div className="shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            {contact.avatarUrl ? (
              <img
                src={contact.avatarUrl}
                alt={contact.fullName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-medium text-gray-600">{avatarLetter}</span>
            )}
          </div>
        </div>

        {/* Текстовая информация */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          {/* Имя */}
          <h3 className="subtext desktop:text max-w-50 min-w-0 truncate font-semibold text-gray-900">
            {contact.fullName}
          </h3>

          {/* Подпись - онлайн */}
          <div className="mt-1 flex items-center gap-1">
            <p
              className={cn("minitext truncate", contact.isOnline ? "text-primary" : "text-black")}
            >
              {contact.isOnline ? "В сети" : "Не в сети"}
            </p>
          </div>
        </div>
      </div>
      {after && <div className="flex shrink-0 items-center justify-center">{after}</div>}
    </SimpleCard>
  );
};
