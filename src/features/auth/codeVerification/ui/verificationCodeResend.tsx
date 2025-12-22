"use client";
import Link from "next/link";

import { VerificationCodeInputTimer } from "@/features/auth/codeVerification/ui/verificationCodeTimer";
import { cn } from "@/shared/shadcn/lib/utils";
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
        asChild
      >
        <Link href="/auth/support">Не приходит код?</Link>
      </Button>
    </div>
  );
};
