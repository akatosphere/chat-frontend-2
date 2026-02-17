import { cn } from "@/shared/shadcn/lib/utils";

type MediaPageProps = {
  className?: string;
};

export const MediaPage: React.FC<MediaPageProps> = ({ className }) => {
  return <div className={cn("", className)}>медиа</div>;
};
