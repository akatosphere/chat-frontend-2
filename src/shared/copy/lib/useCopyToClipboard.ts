"use client";

import { useCallback, useEffect, useState } from "react";

type CopyState = "idle" | "success" | "error";

type UseCopyToClipboardReturn = {
  copy: (text: string | undefined) => Promise<void>;
  state: CopyState;
  isSuccess: boolean;
  isError: boolean;
};

export const useCopyToClipboard = (): UseCopyToClipboardReturn => {
  const [state, setState] = useState<CopyState>("idle");

  const copy = useCallback(async (text: string | undefined) => {
    try {
      if (text) {
        await navigator.clipboard.writeText(text);
        setState("success");
      }
    } catch (error) {
      setState("error");
      console.error("Failed to copy text:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (state !== "idle") {
      const timer = setTimeout(() => setState("idle"), 1500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return {
    copy,
    state,
    isSuccess: state === "success",
    isError: state === "error",
  };
};
