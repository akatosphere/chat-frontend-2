import { cn } from "@/shared/shadcn/lib/utils";

type NoSearchResultsProps = {
  className?: string;
};

export const NoSearchResults: React.FC<NoSearchResultsProps> = ({ className }) => {
  return <div className={cn("", className)}>поиск не дал результатов</div>;
};
