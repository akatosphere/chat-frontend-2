import { cn } from "@/shared/shadcn/lib/utils";
import React from "react";

interface Props {
  className?: string;
  error: string;
}

export const VerificationCodeInputError: React.FC<Props> = ({
  className,
  error,
}) => {
  return <div className={cn("text-error minitext", className)}>{error}</div>;
};
