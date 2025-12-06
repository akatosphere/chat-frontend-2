"use client";
import { Button } from "@/shared/shadcn/ui/button";
import { VerificationCodeInputTimer } from "@/features/code-verification/ui/verificationCodeTimer";

interface Props {
  isResendAvailable: boolean;
  resendTimer: number;
  onResend: () => void;
}

export const VerificationCodeResend = ({
  isResendAvailable,
  resendTimer,
  onResend,
}: Props) => {
  return !isResendAvailable ? (
    <VerificationCodeInputTimer seconds={resendTimer} />
  ) : (
    <Button
      variant="text"
      size="md"
      className="pt-0 pb-0 lg:pt-4 lg:pb-4"
      onClick={onResend}
    >
      Отправить новый код
    </Button>
  );
};
