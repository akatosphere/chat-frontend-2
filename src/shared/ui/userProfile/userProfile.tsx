import { Avatar } from "@/entities/chat/ui/avatar";
import { cn } from "@/shared/shadcn/lib/utils";

type UserProfileProps = {
  className?: string;
  avatarUrl?: string;
  name: string;
  phone: string;
  tag: string;
};

export const UserProfile: React.FC<UserProfileProps> = ({
  className,
  avatarUrl,
  name,
  phone,
  tag,
}) => {
  return (
    <div className={cn("flex items-center gap-3 rounded-lg bg-white p-3", className)}>
      <Avatar avatarUrl={avatarUrl || ""} size="lg" />
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="truncate font-semibold text-black">{name}</h3>
        <span className="subtext text-black">{phone}</span>
        <span className="subtext text-black">{tag}</span>
      </div>
    </div>
  );
};
