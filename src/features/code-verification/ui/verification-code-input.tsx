"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { VerificationCodeInputCell } from "./verification-code-input-cell";
import { VerificationCodeInputError } from "./verification-code-input-error";
import { useVerificationCodeInputController } from "../lib/use-verification-code-input-cotroller";
import { useEffect } from "react";

interface Props {
  className?: string;
  length: number;
  attemptsLeft: number;
  error: string;
  loading: boolean;
  onComplete: (code: string) => void;
  onErrorReset?: () => void;
}

export const VerificationCodeInput: React.FC<Props> = ({
  className,
  length,
  attemptsLeft,
  error,
  loading,
  onComplete,
  onErrorReset,
}) => {
  const {
    values,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePasteFull,
    focus,
    setValues,
  } = useVerificationCodeInputController({
    length,
    onComplete,
  });

  useEffect(() => {
    if (!error || !attemptsLeft) return;

    const timer = setTimeout(() => {
      setValues(Array.from({ length }, () => ""));
      onErrorReset?.();
      focus(1);
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, length]);

  return (
    <div>
      <VerificationCodeInputError error={error} className="mb-1" />

      <div className={cn("flex gap-2 items-center", className)}>
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
