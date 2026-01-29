import { Avatar } from "@/entities/chat/ui/avatar";
import { ChatMemberDto } from "@/entities/user/model/types";
import { cn } from "@/shared/shadcn/lib/utils";

type ContactsListItemProps = {
  className?: string;
  user: ChatMemberDto;
};

export const ContactsListItem: React.FC<ContactsListItemProps> = ({ className, user }) => {
  return (
    <div className={cn("flex gap-2", className)}>
      <Avatar avatarUrl={user.avatar_webp_url || user.avatar_url || ""} isOnline={false} />
      <div className="flex flex-col gap-1">
        <span>{user.nickname}</span>
        <span>{user.first_name}</span>
        <span>{user.last_name}</span>
      </div>
    </div>
  );
};
