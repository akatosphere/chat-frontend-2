'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/shadcn/ui/button'
import { EditPhotoForm } from '@/shared/form/ui/editPhotoForm'
import { AutoGrowTextarea } from '@/shared/form/ui/autoGrowTextarea'
import { GroupTypeSelect } from './GroupTypeSelect'

export function CreateGroupForm() {
    const [groupType, setGroupType] = useState<'open' | 'closed'>('closed')

    return (
        <section
            className="bg-[var(--bg-group)] w-[360px] h-[936px] p-4 border rounded-lg"
            style={{ borderColor: 'var(--muted)' }}
        >
            <div className=" mb-4 flex h-[40px] items-center gap-2 border-b border-b-[var(--muted)]">
                <Link href="/" aria-label="Назад" className="inline-flex items-center justify-center w-10 h-10">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                            fill="#1C1C1E"
                        />
                    </svg>
                </Link>

                <h2 className="text-tight">Создать группу</h2>
            </div>

            <div className="flex justify-center h-[230px] ">
                <EditPhotoForm />
            </div>

            <form className="flex flex-col gap-4 mb-4">
                <div className="overflow-hidden rounded-[16px] border border-[var(--muted)] bg-white">
                    <AutoGrowTextarea
                        placeholder="Название*"
                        className="rounded-none rounded-t-[16px] border-0 h-[56px] min-h-[56px] px-5 py-4"
                    />

                    <AutoGrowTextarea
                        placeholder="Описание"
                        className="rounded-none rounded-b-[16px] border-0 border-t border-[var(--muted)] h-[56px] min-h-[56px] px-5 py-4"
                    />
                </div>

                <GroupTypeSelect value={groupType} onChange={setGroupType} />

                <Button className="h-[58px] rounded-[16px] text ]">
                    Далее
                </Button>
            </form>
        </section>
    )
}