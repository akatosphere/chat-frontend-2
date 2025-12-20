"use client";

import { KeyboardEvent, RefObject, useRef, useState } from "react";

type UseVerificationCodeInputControllerProps = {
  length: number;
  onComplete: (code: string) => void;
}

type UseVerificationCodeInputControllerReturn = {
  values: string[];
  inputsRef: RefObject<(HTMLInputElement | null)[]>;
  setValues: (values: string[]) => void;
  handleChange: (index: number, value: string) => void;
  focus: (index: number) => void;
  handleKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  handlePasteFull: (text: string) => void;
}

export const useVerificationCodeInputController = ({
  length,
  onComplete,
}: UseVerificationCodeInputControllerProps): UseVerificationCodeInputControllerReturn => {
  const [values, setValues] = useState(Array.from({ length }, () => ""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focus = (i: number) => inputsRef.current[i]?.focus();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index === length - 1) {
      onComplete(newValues.join(""));
    }

    if (value && index < length - 1) {
      focus(index + 1);
    }
  };

  const handlePasteFull = (text: string) => {
    const pastedValues = text.slice(0, length).split("");
    if (
      !pastedValues.every((value) => /^\d?$/.test(value)) ||
      pastedValues.length !== length
    )
      return;
    const newValues = [...values];
    for (let i = 0; i < pastedValues.length; i++) {
      newValues[i] = pastedValues[i];
    }
    setValues(newValues);
    focus(length - 1);
    if (newValues.join("").length === length) onComplete(newValues.join(""));
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newValues = [...values];

      if (newValues[index]) {
        newValues[index] = "";
        setValues(newValues);
      } else if (index > 0) {
        newValues[index - 1] = "";
        setValues(newValues);
        focus(index - 1);
      }
    }
  };

  return {
    values,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePasteFull,
    setValues,
    focus,
  };
};
