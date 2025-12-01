import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { forwardRef } from "react";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string | undefined
}

export const FormInput = forwardRef<HTMLInputElement, Props> (
  (
    {
      id,
      label,
      placeholder,
      value,
      error
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-[4px]">
        <Label variant={error ? "error" : "default"} htmlFor={id}>{error || label}</Label>
        <Input id={id} placeholder={placeholder} variant={error ? "error" : "default"} value={value}/>
      </div>
    )
  }
)

FormInput.displayName = "FormInput"