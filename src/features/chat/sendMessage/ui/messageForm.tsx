import { cn } from '@/shared/shadcn/lib/utils';
import { InputGroupTextarea } from '@/shared/shadcn/ui/input-group';

type MessageFormProps = {
  className?: string,
};

export const MessageForm : React.FC<MessageFormProps> = ({
  className,
}) => {
  return (
    <form className={cn('py-3 flex ', className)}>
      <div className='flex-1'/>
      <InputGroupTextarea placeholder='Сообщение' className="subtext flex-3 h-11 bg-white rounded-3xl [&::-webkit-scrollbar]:hidden">
      
      </InputGroupTextarea>
      <div className='flex-1'/>
    </form>
  )
};
