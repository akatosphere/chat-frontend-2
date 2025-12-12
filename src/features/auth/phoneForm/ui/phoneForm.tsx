"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { usePhoneStore } from "../model/store";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, PhoneData } from "../model/schema";
import { sendCode } from "../api/sendCode";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePhoneToCookie } from "../lib/savePhoneToCookie";
import { PhoneInput } from "./phoneInput";

type PhoneFormProps = {
  className?: string;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({ className }) => {
  const setPhone = usePhoneStore((state) => state.setPhone);

  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
    mode: "onChange",
    defaultValues: { phone: "" },
  });

  const showError =
    !isFocused && touchedFields.phone ? errors.phone?.message : "";

  const onSubmit = async (data: PhoneData) => {
    setIsLoading(true);
    const result = await sendCode({
      phone_number: data.phone.replaceAll(" ", ""),
      code_length: 5,
    });

    if (result.success) {
      setPhone(data.phone);
      await savePhoneToCookie(data.phone);
      router.push("/auth/code");
    } else {
      alert(result.error);
    }
    setIsLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-4 h-full", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            id="phone"
            value={field.value}
            onChange={field.onChange}
            onBlur={(e) => {
              setIsFocused(false);
              field.onBlur();
            }}
            onFocus={() => setIsFocused(true)}
            error={field.value && showError}
            disabled={isSubmitting || isLoading}
          />
        )}
      />

      <Button
        variant="default"
        size="lg"
        type="submit"
        disabled={!isValid || isSubmitting || isLoading}
        className="desktop:mt-auto"
      >
        Далее
      </Button>
    </form>
  );
};
