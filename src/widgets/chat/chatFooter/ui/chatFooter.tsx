import { cn } from '@/shared/shadcn/lib/utils';
import { Input } from '@/shared/shadcn/ui/input';

type ChatFooterProps = {
  className?: string,
};

export const ChatFooter : React.FC<ChatFooterProps> = ({
  className,
}) => {
  return (
    <div className={cn("absolute bottom-0 w-full border-2 border-error", className)}>
      <Input/>
    </div>
  );
};