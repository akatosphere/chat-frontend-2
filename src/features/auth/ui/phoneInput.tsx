import { cn } from '@/shared/shadcn/lib/utils';
import { FormInput } from "@/shared/form/ui/formInput";
import { PatternFormat } from "react-number-format";

type PhoneInputProps = {
  className?: string,
  value: string,
  onChange: (value: string) => void,
  error?: string,
  onBlur?: React.FocusEventHandler<HTMLInputElement>,
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
}

export const PhoneInput : React.FC<PhoneInputProps> = ({
  className,
  value,
  error,
  onBlur,
  onFocus,
  onChange
}) => {
  return (
    <div className={cn("", className)}>
      <PatternFormat
        className={cn("", className)}
        customInput={FormInput}
        id="phone"
        label="Введите номер телефона"
        format="+7 ### ### ## ##"
        value={value}
        error={error}
        placeholder="+7 900 000 00 00"
        onValueChange={(v) => onChange(v.formattedValue)}
        onBlur={onBlur}
        onFocus={onFocus}
      />      
    </div>

  );
};
