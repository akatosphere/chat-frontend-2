import { FormInput } from "@/shared/form/ui/formInput";
import { PatternFormat } from "react-number-format";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "+7 999 999 99 99",
}: PhoneInputProps) {
  return (
    <PatternFormat
      customInput={FormInput}
      id="phone"
      label="Введите номер телефона"
      format="+7 ### ### ## ##"
      value={value}
      placeholder={placeholder}
      onValueChange={(v) => onChange(v.formattedValue)}
    />
  );
}
