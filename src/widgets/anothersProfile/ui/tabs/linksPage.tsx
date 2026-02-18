import { cn } from "@/shared/shadcn/lib/utils";

type LinksPageProps = {
  className?: string;
};

export const LinksPage: React.FC<LinksPageProps> = ({ className }) => {
  return <div className={cn("", className)}>Ссылки</div>;
};
