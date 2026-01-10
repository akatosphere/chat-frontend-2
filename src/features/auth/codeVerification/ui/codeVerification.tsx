"use client";
import { useCallback, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Toast } from "@/shared/toast/ui/toast";
import { Tooltip } from "@/shared/ui/tooltip";

import { usePhoneStore } from "../../phoneForm/model/store";
import { useModals } from "../lib/useModals";
import { useVerification } from "../lib/useVerification";
import { useVerificationUI } from "../lib/useVerificationUI";
import { BannedModal } from "./BannedModal";
import { ExpiredCodeModal } from "./CodeExpiredModal";
import { VerificationCodeInput } from "./verificationCodeInput";
import { VerificationCodeResend } from "./verificationCodeResend";

export const CodeVerification: React.FC<{ className?: string }> = ({ className }) => {
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

  const { showBanned, showExpired, closeBanned, closeExpired } = useModals(isBanned, isCodeExpired);

  const [showToast, setShowToast] = useState(false);

  const handleResend = async () => {
    await onResend();
    setShowToast(true);
  };

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text font-medium text-black">Введите код</h3>
        <Tooltip>
          <p>Код должен содержать только цифры.</p>
          <p>Не более 10 запросов кода в час. При превышении — блокировка.</p>
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
        onResend={handleResend}
        resendTimer={resendTimer}
        isResendAvailable={isResendAvailable}
      />

      <BannedModal open={showBanned} onClose={closeBanned} />

      <ExpiredCodeModal open={showExpired} onClose={closeExpired} />

      {showToast && (
        <Toast
          onClose={handleToastClose}
          icon={{
            mobile: "/icons/toast/checkMobile.svg",
            desktop: "/icons/toast/checkDesktop.svg",
          }}
        />
      )}
    </div>
  );
};
