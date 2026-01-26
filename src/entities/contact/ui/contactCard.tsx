import { cn } from "@/shared/shadcn/lib/utils";
import { SimpleCard } from "@/shared/ui/list/simpleCard";

import { Contact } from "../model/types";

export type ContactCardProps = {
  key: number;
  contact: Contact;
  href?: string;
  isLast?: boolean;
};

export const ContactCard = (props: ContactCardProps) => {
  const { contact, href, isLast = false } = props;

  const avatarLetter = contact.firstName?.charAt(0).toUpperCase() || "?";

  return (
    <SimpleCard href={href} isLast={isLast}>
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
        <h3 className="subtext desktop:text min-w-0 truncate font-semibold text-gray-900">
          {contact.fullName}
        </h3>

        {/* Подпись - онлайн */}
        <div className="mt-1 flex items-center gap-1">
          <p className={cn("minitext truncate", contact.isOnline ? "text-primary" : "text-black")}>
            {contact.isOnline ? "В сети" : "Не в сети"}
          </p>
        </div>
      </div>
    </SimpleCard>
  );
};
