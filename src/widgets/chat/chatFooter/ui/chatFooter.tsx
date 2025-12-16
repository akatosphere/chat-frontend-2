'use client'

import { useKeyboardOffset } from '@/shared/lib/useKeyboardOffset'
import { cn } from '@/shared/shadcn/lib/utils'
import { Input } from '@/shared/shadcn/ui/input'

type ChatFooterProps = {
  className?: string
}

export const ChatFooter: React.FC<ChatFooterProps> = ({ className }) => {

  useKeyboardOffset()

  return (
    <footer
      style={{ paddingBottom: 'var(--keyboard-offset)' }}
      className={cn('shrink-0 w-full border-2 border-error', className)}>
      <Input />
    </footer>
  )
}