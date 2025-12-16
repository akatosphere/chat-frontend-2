"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "@/shared/ui/tooltip";
import { cn } from "@/shared/shadcn/lib/utils";
import { VerificationCodeInput } from "./verificationCodeInput";
import { useVerificationUI } from "../lib/useVerificationUI";
import { useVerification } from "../lib/useVerification";
import { VerificationCodeResend } from "./verificationCodeResend";
import { usePhoneStore } from "../../phoneForm/model/store";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";

export const CodeVerification: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { phone } = usePhoneStore();
  
  const {
    attemptsLeft,
    isBanned,
    resendTimer,
    isResendAvailable,
    onComplete,
    onResend,
  } = useVerification({ phone_number: phone.replaceAll(" ", "") });
  
  const { error, loading, handleComplete, setError } = useVerificationUI({
    onComplete,
    attemptsLeft,
  });
  
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isBanned) {
      setOpenModal(true)
    }
  }, [isBanned])

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="flex mb-4 gap-2 items-center">
        <h3 className="font-medium text text-black">Введите код</h3>
        <Tooltip>
          <p>Код должен содержать только цифры.</p>
          <p>Не более 10 запросов кода в час. При превышении — блокировка.</p>
        </Tooltip>
      </div>

      <VerificationCodeInput
        length={5}
        attemptsLeft={attemptsLeft}
        onComplete={handleComplete}
        error={error || (isBanned && 'Слишком много неверных попыток.') || ''}
        loading={loading}
        onErrorReset={() => setError('')}
        className="mb-6 lg:mb-4"
      />

      <VerificationCodeResend onResend={onResend} resendTimer={resendTimer} isResendAvailable={isResendAvailable} />

      <ModalDialog overlay="card" variant='vertical' open={openModal} onOpenChange={setOpenModal} className="gap-5 py-8">
        <div>
          <AlertDialogHeader>
            <AlertDialogTitle className="title text-black font-medium">Лимит исчерпан</AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <AlertDialogDescription className="text text-black" >Попробуйте позднее</AlertDialogDescription>
        <div>
          <AlertDialogFooter className="flex flex-col sm:flex-col  gap-4 desktop:gap-3">
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
};
