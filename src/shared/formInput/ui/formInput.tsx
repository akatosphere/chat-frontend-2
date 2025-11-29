import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { forwardRef } from "react";

interface Props {
  id: string;
  label: string;
  placeholder: string;
}

export const FormInput = forwardRef<HTMLInputElement, Props> (
  (
    {
      id,
      label,
      placeholder
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-[4px]">
        <Label className="minitext-tight font-normal text-gray" htmlFor={id}>{label}</Label>
        <Input id={id} placeholder={placeholder}/>
      </div>
    )
  }
)

FormInput.displayName = "FormInput"