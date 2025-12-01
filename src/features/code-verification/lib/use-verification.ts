"use client";
import { useEffect } from "react";
import { useVerificationStore } from "../model/user-verification-store";

interface useVerificationOptions {
  initialAttemptsLeft?: number;
  resendBlockTime?: number;
  banTime?: {
    firstBan: number;
    repeatBan: number;
  };
}

export const useVerification = ({
  initialAttemptsLeft = 5,
  resendBlockTime = 120,
  banTime = { firstBan: 600, repeatBan: 3600 },
}: useVerificationOptions) => {
  const {
    attemptsLeft,
    banLevel,
    resendTimer,
    isBanned,
    isResendAvailable,
    setAttemptsLeft,
    setBanLevel,
    setResendTimer,
    setIsBanned,
    setIsResendAvailable,
  } = useVerificationStore();

  useEffect(() => {
    if (isResendAvailable || resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendAvailable(true);
          if (isBanned) {
            setIsBanned(false);
            setAttemptsLeft(initialAttemptsLeft);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isResendAvailable,
    resendTimer,
    isBanned,
    initialAttemptsLeft,
    setIsBanned,
    setAttemptsLeft,
    setResendTimer,
    setIsResendAvailable,
  ]);

  const handleBan = () => {
    setIsBanned(true);
    setBanLevel((prev) => {
      const newBanLevel = prev + 1;
      if (newBanLevel === 1) setResendTimer(banTime.firstBan);
      else if (newBanLevel >= 2) setResendTimer(banTime.repeatBan);
      setIsResendAvailable(false);
      return newBanLevel;
    });
  };

  const onComplete = (code: string) => {
    if (isBanned) return { success: false };
    // Тут API на проверку кода, когда сделаем
    if (code !== "11111") {
      setAttemptsLeft((x) => {
        if (x <= 1) handleBan();
        return x - 1;
      });
      return {
        success: false,
      };
    }
    setAttemptsLeft(initialAttemptsLeft);
    return { success: true };
  };

  const onResend = () => {
    setIsResendAvailable(false);
    setResendTimer(resendBlockTime);
    // Тут API для повторной отправки кода
  };

  return {
    attemptsLeft,
    banLevel,
    resendTimer,
    isBanned,
    isResendAvailable,
    onComplete,
    onResend,
  };
};
