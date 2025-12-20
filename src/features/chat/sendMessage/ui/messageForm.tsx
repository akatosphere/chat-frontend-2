import { useState } from 'react'
import { cn } from '@/shared/shadcn/lib/utils'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '@/shared/shadcn/ui/input-group'
import { resize } from '../lib/resizeTextareaHandler'
import { Button } from '@/shared/shadcn/ui/button'
import EmojiBtn from '@icons/chat/emojiBtn.svg'
import MessageSendBtn from '@icons/chat/messageSendBtn.svg'
import AttachBtn from '@icons/chat/attachBtn.svg'
import VoiceMessage from '@icons/chat/voiceMessage.svg'

type MessageFormProps = {
  className?: string
  onEmojiBtnClick?: () => void
  onAttachBtnClick?: () => void
  onSubmitMessage: (message: string) => void
}

export const MessageForm: React.FC<MessageFormProps> = ({
  className,
  onEmojiBtnClick,
  onAttachBtnClick,
  onSubmitMessage,
}) => {
  const [textMessage, setTextMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedMessage = textMessage.trim()
    if (!trimmedMessage) {
      return
    }

    onSubmitMessage(trimmedMessage)
    setTextMessage('')
  }

  return (
    <form className={cn('py-3 flex items-end', className)} onSubmit={handleSubmit}>
      <div className="flex-1 flex flex-row-reverse pr-3 h-11">
        <Button variant="ghost" size="icon-auto" onClick={onAttachBtnClick} type="button">
          <AttachBtn className="w-11 h-11" />
        </Button>
      </div>

      <InputGroup className="flex flex-4 bg-white rounded-3xl h-min max-h-[172px]">
        <InputGroupTextarea
          onInput={resize}
          rows={1}
          placeholder="Сообщение"
          value={textMessage}
          onChange={e => setTextMessage(e.target.value)}
          className="
            subtext
            h-11
            desktop:h-11
            min-h-11
            max-h-[172px]
            overflow-y-auto
            resize-none
            [&::-webkit-scrollbar]:hidden
          "
        />

        <InputGroupAddon align="inline-end" className='pb-3'>
          <InputGroupButton onClick={onEmojiBtnClick} type="button" size="icon-auto">
            <EmojiBtn className="h-5 w-5" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex-1 pl-3 h-11">
        {textMessage.trim() ? (
          <Button variant="ghost" size="icon-auto" type="submit">
            <MessageSendBtn className="w-11 h-11" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon-auto" type="button">
            <VoiceMessage className="w-11 h-11" />
          </Button>
        )}
      </div>
    </form>
  )
}
