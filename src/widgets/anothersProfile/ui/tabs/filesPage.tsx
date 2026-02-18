import { cn } from "@/shared/shadcn/lib/utils";

type FilesPageProps = {
  className?: string;
};

export const FilesPage: React.FC<FilesPageProps> = ({ className }) => {
  return <div className={cn("", className)}>файлы</div>;
};
