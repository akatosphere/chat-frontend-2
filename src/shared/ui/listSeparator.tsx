import { cn } from "@/shared/shadcn/lib/utils";

type ListSeparatorProps = {
  className?: string;
  text: string;
  after?: React.ReactNode;
};

export const ListSeparator: React.FC<ListSeparatorProps> = ({ className, text, after }) => {
  return (
    <div className={cn("bg-primary-gray flex justify-between px-3 py-2", className)}>
      <p className="minitext-tight font-normal">{text}</p>
      {after && <div className="h-5 w-5">{after}</div>}
    </div>
  );
};
