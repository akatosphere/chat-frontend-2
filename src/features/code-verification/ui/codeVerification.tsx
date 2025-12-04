"use client";
import React from "react";
import { Tooltip } from "@/shared/ui/tooltip";
import { cn } from "@/shared/shadcn/lib/utils";
import { VerificationCodeInput } from "./verificationCodeInput";
import { useVerificationUI } from "../lib/useVerificationUI";
import { useVerification } from "../lib/useVerification";
import { VerificationCodeResend } from "./verificationCodeResend";

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

      <VerificationCodeResend
        onResend={onResend}
        resendTimer={resendTimer}
        isResendAvailable={isResendAvailable}
      />
    </div>
  );
};
