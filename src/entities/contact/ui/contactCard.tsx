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

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="truncate text-base font-medium text-gray-900">
          {user.first_name} {user.last_name}
        </h3>
        {user.username && <p className="truncate text-sm text-gray-500">@{user.username}</p>}
      </div>
    </SimpleCard>
  );
};
