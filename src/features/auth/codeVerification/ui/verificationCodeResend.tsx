"use client";
import { Button } from "@/shared/shadcn/ui/button";
import { VerificationCodeInputTimer } from "@/features/auth/codeVerification/ui/verificationCodeTimer";
import { cn } from "@/shared/shadcn/lib/utils";
import Link from "next/link";

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
          className="pt-0 pb-0 lg:pt-4 lg:pb-4 text-primary w-full text-center text font-medium"
          onClick={onResend}
        >
          Отправить новый код
        </Button>
      )}
      <Button
        variant={"text"}
        size="inline"
        className="pt-0 pb-0 lg:pt-4 lg:pb-4 mt-5 desktop:mt-3 w-full text-center text font-medium"
        asChild
      >
        <Link href="/auth/support">Не приходит код?</Link>
      </Button>
    </div>
  );
};
