'use client'
import { Button } from '@/shared/shadcn/ui/button'
import { VerificationCodeInputTimer } from '@/features/auth/codeVerification/ui/verificationCodeTimer'
import { cn } from '@/shared/shadcn/lib/utils'
import Link from 'next/link'
import { ModalDialog } from '@/shared/modalDialog/ui/modalDialog'
import { useState } from 'react'
import { AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/shared/shadcn/ui/alert-dialog'

interface Props {
  className?: string
  isResendAvailable: boolean
  resendTimer: number
  onResend: () => void
}

export const VerificationCodeResend = ({ className, isResendAvailable, resendTimer, onResend }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className={cn(className)}>
      {!isResendAvailable ? (
        <VerificationCodeInputTimer seconds={resendTimer} />
      ) : (
        <Button
          variant="text"
          size="inline"
          className="pt-0 pb-0 lg:pt-4 lg:pb-4 text-primary w-full text-center text font-medium"
          onClick={onResend}>
          Отправить новый код
        </Button>
      )}
      <Button
        variant={'text'}
        size="inline"
        className="pt-0 pb-0 lg:pt-4 lg:pb-4 mt-5 desktop:mt-3 w-full text-center text font-medium"
        onClick={() => setOpenModal(true)}>
        Не приходит код?
      </Button>
      <ModalDialog overlay="card" open={openModal} onOpenChange={setOpenModal} className="gap-5 py-8">
        <div>
          <AlertDialogHeader className="mt-2 desktop:mt-0">
            <AlertDialogTitle className=" text-center title text-black font-medium">Код не пришел?</AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <div>
          <AlertDialogDescription />
          <AlertDialogFooter className="flex flex-col sm:flex-col gap-3">
            <Button variant="default" size="md" className="flex flex-1" asChild>
              <Link href="/auth/support">Обратиться в поддержку</Link>
            </Button>
            <Button variant="outline" size="md" className="flex flex-1" onClick={() => setOpenModal(false)}>
              Закрыть
            </Button>
          </AlertDialogFooter>
        </div>
      </ModalDialog>
    </div>
  )
}
