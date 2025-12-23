"use client";
import Link from "next/link";
import { useState } from "react";

import { VerificationCodeInputTimer } from "@/features/auth/codeVerification/ui/verificationCodeTimer";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";

interface Props {
  className?: string;
  isResendAvailable: boolean;
  resendTimer: number;
  onResend: () => void;
}

export const VerificationCodeResend = ({
  className,
  isResendAvailable,
  resendTimer,
  onResend,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={cn(className)}>
      {!isResendAvailable ? (
        <VerificationCodeInputTimer seconds={resendTimer} />
      ) : (
        <Button
          variant="text"
          size="inline"
          className="text-primary text w-full pt-0 pb-0 text-center font-medium lg:pt-4 lg:pb-4"
          onClick={onResend}
        >
          Отправить новый код
        </Button>
      )}
      <Button
        variant={"text"}
        size="inline"
        className="desktop:mt-3 text mt-5 w-full pt-0 pb-0 text-center font-medium lg:pt-4 lg:pb-4"
        onClick={() => setOpenModal(true)}
      >
        Не приходит код?
      </Button>
      <ModalDialog
        overlay="card"
        open={openModal}
        onOpenChange={setOpenModal}
        className="gap-5 py-8"
      >
        <div>
          <AlertDialogHeader className="desktop:mt-0 mt-2">
            <AlertDialogTitle className="title text-center font-medium text-black">
              Код не пришел?
            </AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <div>
          <AlertDialogDescription />
          <AlertDialogFooter className="flex flex-col gap-3 sm:flex-col">
            <Button variant="default" size="md" className="flex flex-1" asChild>
              <Link href="/auth/support">Обратиться в поддержку</Link>
            </Button>
            <Button
              variant="outline"
              size="md"
              className="flex flex-1"
              onClick={() => setOpenModal(false)}
            >
              Закрыть
            </Button>
          </AlertDialogFooter>
        </div>
      </ModalDialog>
    </div>
  );
};
