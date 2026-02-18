import { cn } from "@/shared/shadcn/lib/utils";

type VoicesPageProps = {
  className?: string;
};

export const VoicesPage: React.FC<VoicesPageProps> = ({ className }) => {
  return <div className={cn("", className)}>Голосовые сообщения</div>;
};
