import { cn } from '@/shared/shadcn/lib/utils'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/shared/shadcn/ui/input-group'
import { resize } from '../lib/resizeTextareaHandler'

type MessageFormProps = { className?: string }

export const MessageForm: React.FC<MessageFormProps> = ({ className }) => {

  return (
    <form className={cn('py-3 flex', className)}>
      <div className="flex-1" />
      <InputGroup className='flex-3 bg-white rounded-3xl'>
        <InputGroupTextarea
          onInput={resize}
          rows={1}
          placeholder="Сообщение"
          className="
                      subtext
                      h-11
                      min-h-11
                      max-h-[172px]
                      overflow-y-auto
                      resize-none                     
                      [&::-webkit-scrollbar]:hidden
                  "
        >
        </InputGroupTextarea>
          <InputGroupAddon align="inline-end">
            <InputGroupText>:)</InputGroupText>
          </InputGroupAddon>
      </InputGroup>

      <div className="flex-1" />
    </form>
  )
}

