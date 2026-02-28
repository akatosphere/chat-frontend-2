import { cn } from "@/shared/shadcn/lib/utils";

type SettingsPageProps = {
  className?: string;
};

export const SettingsPage: React.FC<SettingsPageProps> = ({ className }) => {
  return <div className={cn("", className)}>Настройки</div>;
};
