import { cn } from "@/shared/shadcn/lib/utils";

type ParticipantsPageProps = {
  className?: string;
};

export const ParticipantsPage: React.FC<ParticipantsPageProps> = ({ className }) => {
  return <div className={cn("", className)}>участники</div>;
};
