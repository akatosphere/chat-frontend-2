"use client";
import React from "react";
import { Tooltip } from "@/shared/ui/tooltip";
import { cn } from "@/shared/shadcn/lib/utils";
import { VerificationCodeInput } from "@/features/code-verification/ui/verification-code-input";
import { ResendSection } from "@/features/code-verification/ui/verification-code-resend";
import { useVerification } from "@/features/code-verification/lib/use-verification";
import { useVerificationUI } from "@/features/code-verification/lib/use-verification-ui";

export const CodeVerification: React.FC<{ className?: string }> = ({
  className,
}) => {
  const {
    attemptsLeft,
    isBanned,
    onComplete,
    onResend,
    isResendAvailable,
    resendTimer,
  } = useVerification({});

  const { error, loading, handleComplete, setError } = useVerificationUI({
    onComplete,
    attemptsLeft,
  });

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="flex mb-4 gap-2 items-center">
        <h3 className="font-bold text text-text">Введите код</h3>
        <Tooltip>
          <p>Код должен содержать только цифры.</p>
          <p>Не более 10 запросов кода в час. При превышении — блокировка.</p>
        </Tooltip>
      </div>

      <VerificationCodeInput
        length={5}
        attemptsLeft={attemptsLeft}
        onComplete={handleComplete}
        error={error || (isBanned && "Слишком много неверных попыток.") || ""}
        loading={loading}
        onErrorReset={() => setError("")}
        className="mb-3 lg:mb-4"
      />

      <ResendSection
        onResend={onResend}
        resendTimer={resendTimer}
        isResendAvailable={isResendAvailable}
      />
    </div>
  );
};
