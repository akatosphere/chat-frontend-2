import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { forwardRef } from "react";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, Props> (
  (
    {
      id,
      label,
      placeholder,
      value,
      onChange,
      error
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
        />
      </div>
    )
  }
)

FormInput.displayName = "FormInput"