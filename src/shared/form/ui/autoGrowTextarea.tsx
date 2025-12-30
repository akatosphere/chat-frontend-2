'use client'

import { useRef } from 'react'
import { Textarea } from '@/shared/shadcn/ui/textarea'

type Props = React.ComponentProps<typeof Textarea>

export function AutoGrowTextarea(props: Props) {
    const ref = useRef<HTMLTextAreaElement>(null)

    const handleInput = () => {
        if (!ref.current) return
        ref.current.style.height = '56px'
        ref.current.style.height = `${ref.current.scrollHeight}px`
    }

    return (
        <Textarea
            ref={ref}
            onInput={handleInput}
            className="h-[56px] min-h-[56px] resize-none overflow-hidden"
            {...props}
        />
    )
}