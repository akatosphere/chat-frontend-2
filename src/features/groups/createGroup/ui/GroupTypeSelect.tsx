'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type GroupType = 'closed' | 'open'

type Option = {
    value: GroupType
    title: string
    description: string
}

const options: Option[] = [
    {
        value: 'closed',
        title: 'Закрытая',
        description: 'В закрытую группу можно попасть только по приглашению или пригласительной ссылке'
    },
    {
        value: 'open',
        title: 'Открытая',
        description: 'Открытую группу можно найти через поиск. Присоединиться к ней может любой пользователь'
    }
]

type Props = {
    value: GroupType
    onChange: (value: GroupType) => void
    label?: string
}

function Chevron({ open }: { open: boolean }) {
    return (
        <span className={open ? 'rotate-180 transition-transform' : 'transition-transform'}>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z"
            fill="#747474"
        />
      </svg>
    </span>
    )
}

export function GroupTypeSelect({ value, onChange, label = 'Тип группы' }: Props) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onOutside = (e: MouseEvent) => {
            if (open && !rootRef.current?.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onOutside)
        return () => document.removeEventListener('mousedown', onOutside)
    }, [open])

    const selected = useMemo(() => options.find(o => o.value === value)!, [value])

    return (
        <div ref={rootRef} className="relative">
            <div className="mb-2 text-sm text-muted-foreground">{label}</div>

            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="w-full h-[56px] rounded-[16px] bg-white px-5 flex items-center justify-between"
            >
                <span className="text-base">{selected.title}</span>
                <Chevron open={open} />
            </button>

            {open && (
                <div className="mt-2 rounded-[16px] bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4">
                        {options.map(opt => {
                            const checked = opt.value === value

                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value)
                                        setOpen(false)
                                    }}
                                    className="w-full text-left flex gap-4 items-start"
                                >
                  <span
                      className={[
                          'mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0',
                          checked ? 'border-2 border-[var(--primary)]' : 'border border-[var(--muted)]'
                      ].join(' ')}
                  >
                    {checked && <span className="w-3 h-3 rounded-full bg-[var(--primary)]" />}
                  </span>

                                    <span className="flex flex-col">
                    <span className="text-base">{opt.title}</span>
                    <span className="text-sm text-muted-foreground leading-snug">{opt.description}</span>
                  </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}