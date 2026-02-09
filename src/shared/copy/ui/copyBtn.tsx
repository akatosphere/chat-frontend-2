"use client";

import CopyIcon from "@icons/chat/context-menu/copy.svg";
import { useCallback, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { Toast } from "@/shared/toast/ui/toast";

import { useCopyToClipboard } from "../lib/useCopyToClipboard";

type CopyBtnProps = {
  text?: string;
  className?: string;
  toastMessage?: string;
  onCopySuccess?: () => void;
  onCopyError?: (error: Error) => void;
};

export const CopyBtn: React.FC<CopyBtnProps> = ({
  text,
  className,
  onCopySuccess,
  onCopyError,
  toastMessage = "Скопировано в буфер обмена",
}) => {
  const { copy, state } = useCopyToClipboard();
  const [showToast, setShowToast] = useState(false);

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  const handleClick = async () => {
    try {
      await copy(text);
      onCopySuccess?.();
      setShowToast(true);
    } catch (error) {
      onCopyError?.(error as Error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon-auto"
        className={cn(className)}
        onClick={handleClick}
        title={state === "success" ? "Скопировано!" : "Копировать"}
        aria-label={state === "success" ? "Скопировано" : "Копировать"}
      >
        <CopyIcon
          className={cn(
            "h-5 w-5",
            state === "success" && "text-primary",
            state === "error" && "text-error",
            state === "idle" && "text-primary",
            "hover:text-primary-secondary smooth",
          )}
        />
      </Button>
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={handleToastClose}
          icon={{
            mobile: "/icons/toast/checkMobile.svg",
            desktop: "/icons/toast/checkDesktop.svg",
          }}
        />
      )}
    </>
  );
};
