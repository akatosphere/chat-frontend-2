import { cn } from "@/shared/shadcn/lib/utils";

type InvitePageProps = {
  className?: string;
};

export const InvitePage: React.FC<InvitePageProps> = ({ className }) => {
  return <div className={cn("", className)}>страница приглашений</div>;
};
