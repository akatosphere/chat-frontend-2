import { FormInput } from "@/shared/form/ui/formInput";
import { PatternFormat } from "react-number-format";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export default function PhoneInput({
  value,
  onChange,
  error,
  onBlur,
  onFocus
}: PhoneInputProps) {
  return (
    <PatternFormat
      customInput={FormInput}
      id="phone"
      label="Введите номер телефона"
      format="+7 ### ### ## ##"
      value={value}
      error={error}
      placeholder="+7 999 999 99 99"
      onValueChange={(v) => onChange(v.formattedValue)}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
