import { cn } from "@/shared/shadcn/lib/utils";

type InfoItemProps = {
  className?: string;
  title?: string;
  text?: string;
};

export const InfoItem: React.FC<InfoItemProps> = ({ className, text, title }) => {
  return (
    <div className="border-muted w-full cursor-default overflow-hidden border-b last:border-0">
      <div className="flex flex-col gap-1 px-3 py-2">
        {title && <p className="text-gray caption">{title}</p>}
        {text && <p className={cn("subtext", className)}>{text}</p>}
      </div>
    </div>
  );
};
