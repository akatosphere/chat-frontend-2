import { cn } from '@/shared/shadcn/lib/utils';
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { forwardRef } from "react";

type FormInputProps = {
  className?: string,
  id: string,
  label?: string,
  placeholder?: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  error?: string,
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean,
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps> (
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
      disabled
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-[4px]", className)}>
        <Label variant={error ? "error" : "default"} htmlFor={id}>{error || label}</Label>
        <Input 
          id={id} 
          ref={ref} 
          placeholder={placeholder} 
          variant={error ? "error" : "default"} 
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
        />
      </div>
    )
  }
)

FormInput.displayName = "FormInput"