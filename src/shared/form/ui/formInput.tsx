import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { forwardRef } from "react";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = forwardRef<HTMLInputElement, Props> (
  (
    {
      id,
      label,
      placeholder,
      value,
      onChange,
      error,
      onBlur,
      onFocus
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-[4px]">
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
        />
      </div>
    )
  }
)

FormInput.displayName = "FormInput"