import { SimpleCard } from "@/shared/ui/list/simpleCard";

import { ContactItem } from "../model/types";

export type ContactCardProps = {
  contact: ContactItem;
  href?: string;
  isLast?: boolean;
};

export const ContactCard = (props: ContactCardProps) => {
  const { contact, href, isLast = false } = props;
  const user = contact.user;

  const avatarLetter = user.first_name?.charAt(0).toUpperCase() || "?";

  return (
    <SimpleCard href={href} isLast={isLast}>
      {/* Аватар с буквой */}
      <div className="shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          {user.avatar_webp_url || user.avatar_url ? (
            <img
              src={user.avatar_webp_url || user.avatar_url || ""}
              alt={`${user.first_name} ${user.last_name}`}
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
          {user.first_name} {user.last_name}
        </h3>

        {/* Подпись - текст статуса (или какой-то другой) */}
        {contact.status_text && (
          <div className="mt-1 flex items-center gap-1">
            <p className="minitext text-gray line-clamp-2 truncate">{contact.status_text}</p>
          </div>
        )}
      </div>
    </SimpleCard>
  );
};
