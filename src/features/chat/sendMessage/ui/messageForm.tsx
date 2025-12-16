import { cn } from '@/shared/shadcn/lib/utils'
import { InputGroupTextarea } from '@/shared/shadcn/ui/input-group'
import { useLayoutEffect, useRef } from 'react'

type MessageFormProps = { className?: string }

export const MessageForm: React.FC<MessageFormProps> = ({ className }) => {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  const resize = () => {
    const el = ref.current
    if (!el) return

    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  useLayoutEffect(() => {
    resize()
  }, [])

  return (
    <form className={cn('py-3 flex', className)}>
      <div className="flex-1" />

      <InputGroupTextarea
        ref={ref}
        rows={1}
        placeholder="Сообщение"
        className="
                    subtext
                    flex-3
                    h-11
                    min-h-11
                    max-h-[172px]
                    overflow-y-auto
                    resize-none
                    bg-white
                    rounded-3xl
                    [&::-webkit-scrollbar]:hidden
                "
      />

      <div className="flex-1" />
    </form>
  )
}
