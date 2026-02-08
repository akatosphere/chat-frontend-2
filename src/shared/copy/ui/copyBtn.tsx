"use client";

import CopyIcon from "@icons/chat/context-menu/copy.svg";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { useCopyToClipboard } from "../lib/useCopyToClipboard";

type CopyBtnProps = {
  text?: string;
  className?: string;
  onCopySuccess?: () => void;
  onCopyError?: (error: Error) => void;
};

export const CopyBtn: React.FC<CopyBtnProps> = ({
  text,
  className,
  onCopySuccess,
  onCopyError,
}) => {
  const { copy, state } = useCopyToClipboard();

  const handleClick = async () => {
    try {
      await copy(text);
      onCopySuccess?.();
    } catch (error) {
      onCopyError?.(error as Error);
    }
  };

  return (
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
          "h-5 w-5 transition-colors duration-200",
          state === "success" && "text-primary",
          state === "error" && "text-error",
          state === "idle" && "text-primary",
        )}
      />
    </Button>
  );
};
