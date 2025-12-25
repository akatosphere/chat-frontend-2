"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { useVerificationCodeInputController } from "../lib/useVerificationCodeInputCotroller";
import { VerificationCodeInputCell } from "./verificationCodeInputCell";
import { VerificationCodeInputError } from "./verificationCodeInputError";

interface Props {
  className?: string;
  length: number;
  attemptsLeft: number;
  error: string;
  loading: boolean;
  isCodeExpired: boolean;
  isBanned: boolean;
  onComplete: (code: string) => void;
  onErrorReset?: () => void;
}

export const VerificationCodeInput: React.FC<Props> = ({
  className,
  length,
  attemptsLeft,
  error,
  loading,
  isCodeExpired,
  isBanned,
  onComplete,
  onErrorReset,
}) => {
  const { values, inputsRef, handleChange, handleKeyDown, handlePasteFull, focus, setValues } =
    useVerificationCodeInputController({
      length,
      onComplete,
    });

  useEffect(() => {
    if (!error) return;
    if (isBanned) return;

    const timer = setTimeout(() => {
      setValues(Array.from({ length }, () => ""));
      onErrorReset?.();
      focus(0);
    }, 2000);

    return () => clearTimeout(timer);
  }, [error, isBanned, length]);

  const wasBannedRef = useRef(isBanned);
  const wasExpiredRef = useRef(isCodeExpired);

  useEffect(() => {
    console.log(isCodeExpired);
    if ((wasBannedRef.current && !isBanned) || (!wasExpiredRef.current && isCodeExpired)) {
      setValues(Array.from({ length }, () => ""));
      onErrorReset?.();
      focus(0);
    }

    wasBannedRef.current = isBanned;
    wasExpiredRef.current = isCodeExpired;
  }, [isBanned, isCodeExpired, length]);

  return (
    <div>
      <VerificationCodeInputError error={error} className="mb-1" />

      <div className={cn("flex items-center gap-2", className)}>
        {values.map((v, i) => (
          <VerificationCodeInputCell
            key={i}
            index={i}
            value={v}
            error={!!error}
            disabled={attemptsLeft === 0 || loading}
            inputRef={(el) => (inputsRef.current[i] = el)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPasteFull={handlePasteFull}
          />
        ))}
      </div>
    </div>
  );
};
