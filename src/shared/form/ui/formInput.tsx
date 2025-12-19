import { forwardRef } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";

type FormInputProps = {
  className?: string;
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;

  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, id, label, placeholder, error, disabled, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <Label variant={error ? "error" : "default"} htmlFor={id}>
          {error || label}
        </Label>

        <Input
          id={id}
          ref={ref}
          placeholder={placeholder}
          variant={error ? "error" : "default"}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
