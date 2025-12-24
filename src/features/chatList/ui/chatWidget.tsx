import { cn } from "@/shared/shadcn/lib/utils";

type ChatWidgetProps = {
  className?: string;
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <div className="min-h-30 w-full bg-white">Header</div>
    </div>
  );
};
