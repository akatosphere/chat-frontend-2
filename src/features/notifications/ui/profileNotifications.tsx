import { cn } from "@/shared/shadcn/lib/utils";
import { Switch } from "@/shared/shadcn/ui/switch";

type ProfileNotificationsProps = {
  className?: string;
};

export const ProfileNotifications: React.FC<ProfileNotificationsProps> = ({ className }) => {
  return (
    <div className={cn("subtext flex w-full items-center justify-between text-black", className)}>
      <p>Уведомления</p>
      <Switch size="lg" />
    </div>
  );
};
