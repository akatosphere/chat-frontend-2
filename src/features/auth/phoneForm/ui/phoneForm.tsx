"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { useState } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { PhoneInput } from "../../ui/phoneInput";
import { usePhoneStore } from "../model/store";
import { sendCode } from "../api/sendCode";
import { phoneSchema } from "../model/schema";

type PhoneFormProps = {
  className?: string;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({ className }) => {
  const setPhone = usePhoneStore((state) => state.setPhone);

  const [localPhone, setLocalPhone] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value: string) => {
    setLocalPhone(value);
    const result = phoneSchema.safeParse(value);
    setIsValid(result.success);
  };

  const handleFocus = () => {
    setError("");
  };

  const handleBlur = () => {
    const result = phoneSchema.safeParse(localPhone);
    if (!result.success && localPhone) {
      setError(result.error.issues[0].message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    setIsLoading(true);
    const result = await sendCode({
      phone_number: localPhone.replaceAll(" ", ""),
      code_length: 5,
    });
    if (result.success) {
      setPhone(localPhone);
      console.log("Ответ от сервера:", result.data);
    } else {
      setError(result.error);
    }
    setLocalPhone("");
    setIsLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-2", className)}
      onSubmit={handleSubmit}
    >
      <PhoneInput
        id="phone"
        value={localPhone}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={error}
        disabled={isLoading}
      />
      <Button
        variant="default"
        size="lg"
        type="submit"
        disabled={!isValid || isLoading}
      >
        Далее
      </Button>
    </form>
  );
};
