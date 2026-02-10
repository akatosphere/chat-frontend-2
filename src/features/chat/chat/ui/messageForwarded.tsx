import { Avatar } from "@/entities/chat/ui/avatar";
import { cn } from "@/shared/shadcn/lib/utils";

type MessageForwardedProps = {
  className?: string;
};

export const MessageForwarded: React.FC<MessageForwardedProps> = ({ className }) => {
  return (
    <div className={cn("px-3 pt-2.5", className)}>
      <div className="cursor-pointer truncate">
        <span className="text-primary-secondary minitext">Переслано от</span>
        <div className="flex h-4.5 gap-1">
          <Avatar size="xs" avatarUrl="" />
          <span className="text-primary minitext self-center leading-4 font-medium">
            Сергей Авдиев
          </span>
        </div>
      </div>
    </div>
  );
};
