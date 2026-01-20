import { cn } from "@/shared/shadcn/lib/utils";

type ContactsListProps = {
  className?: string;
};

export const ContactsList: React.FC<ContactsListProps> = ({ className }) => {
  return <div className={cn("", className)}></div>;
};
