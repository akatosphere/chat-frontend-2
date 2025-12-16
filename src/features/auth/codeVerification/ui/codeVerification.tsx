"use client";
import React, { useEffect, useRef } from "react";
import { Tooltip } from "@/shared/ui/tooltip";
import { cn } from "@/shared/shadcn/lib/utils";
import { VerificationCodeInput } from "./verificationCodeInput";
import { useVerificationUI } from "../lib/useVerificationUI";
import { useVerification } from "../lib/useVerification";
import { VerificationCodeResend } from "./verificationCodeResend";
import { usePhoneStore } from "../../phoneForm/model/store";

export const CodeVerification: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { phone } = usePhoneStore();

  const {
    attemptsLeft,
    isBanned,
    resendTimer,
    isResendAvailable,
    isCodeExpired,
    onComplete,
    onResend,
  } = useVerification({ phone_number: phone.replaceAll(" ", "") });

  const { error, loading, handleComplete, setError } = useVerificationUI({
    onComplete,
    attemptsLeft,
  });

  const openExpiredModal = () => {
    alert("Код истёк(");
  };

  const hasOpenedModal = useRef(false);

  useEffect(() => {
    if (!isCodeExpired) return;
    if (hasOpenedModal.current) return;

    openExpiredModal();
    hasOpenedModal.current = true;
  }, [isCodeExpired]);

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
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
        isBanned={isBanned}
        isCodeExpired={isCodeExpired}
        error={
          (isCodeExpired && "Запросите код повторно.") ||
          (attemptsLeft >= 1 && error) ||
          (isBanned && "Слишком много неверных попыток.") ||
          ""
        }
        loading={loading}
        onErrorReset={() => setError("")}
        className="mb-6 lg:mb-4"
      />

      <VerificationCodeResend
        onResend={onResend}
        resendTimer={resendTimer}
        isResendAvailable={isResendAvailable}
      />
    </div>
  );
};
