'use client'

import { MessageForm } from '@/features/chat/sendMessage/ui/messageForm'
import { useKeyboardOffset } from '@/shared/lib/useKeyboardOffset'
import { cn } from '@/shared/shadcn/lib/utils'

type ChatFooterProps = {
  className?: string
}

export const ChatFooter: React.FC<ChatFooterProps> = ({ className }) => {
  const { isKeyboardOpen } = useKeyboardOffset()

  return (
    <footer
      style={{ paddingBottom: 'var(--keyboard-offset)' }}
      className={cn('shrink-0 w-full bg-primary-gray/90', className)}>
      <MessageForm isKeyboardOpen={isKeyboardOpen} onSubmitMessage={m => console.log('сообщение:', m)} />
    </footer>
  )
}