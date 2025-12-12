import { cn } from "@/shared/shadcn/lib/utils";
import { Label } from "@/shared/shadcn/ui/label";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { forwardRef } from "react";

type FormTextareaProps = {
  className?: string;
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      className,
      id,
      label,
      placeholder,
      value,
      onChange,
      error,
      onBlur,
      onFocus,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <Label variant={error ? "error" : "default"} htmlFor={id}>
          {error || label}
        </Label>
        <Textarea
          className={className}
          id={id}
          ref={ref}
          placeholder={placeholder}
          variant={error ? "error" : "default"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
