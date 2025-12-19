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
  onAttachBtnClick: () => void
}

export const MessageForm: React.FC<MessageFormProps> = ({ className, onEmojiBtnClick }) => {
  const [textMessage, setTextMessage] = useState('');

  return (
    <form className={cn('py-3 flex', className)}>
      <div className="flex-1 flex flex-row-reverse">
        <div className="px-2">
          <Button variant="ghost" size="icon-lg" asChild>
            <AttachBtn />
          </Button>
        </div>
      </div>
      <InputGroup className="flex-4 bg-white rounded-3xl">
        <InputGroupTextarea
          onInput={resize}
          rows={1}
          placeholder="Сообщение"
          value={textMessage}
          onChange={e => setTextMessage(e.target.value)}
          className="
                      subtext
                      h-11
                      min-h-11
                      max-h-[172px]
                      overflow-y-auto
                      resize-none                     
                      [&::-webkit-scrollbar]:hidden
                  "></InputGroupTextarea>
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={onEmojiBtnClick}>
            <EmojiBtn />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex-1">
        <div className="px-2">
          {textMessage.trim() ? (
            <Button variant="ghost" size="icon-lg" type="submit" asChild>
              <MessageSendBtn />
            </Button>
          ) : (
            <Button variant="ghost" size="icon-lg" type="submit" asChild>
              <VoiceMessage />
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
