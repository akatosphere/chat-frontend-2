"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { PhoneInput } from "../../ui/phoneInput";
import { usePhoneStore } from "../model/store";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, PhoneData } from "../model/schema";
import { sendCode } from "../api/sendCode";
import { useState } from "react";

type PhoneFormProps = {
  className?: string;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({ className }) => {
  const setPhone = usePhoneStore((state) => state.setPhone);

  const [isFocused, setIsFocused] = useState(false);

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
    const result = await sendCode({
      phone_number: data.phone.replaceAll(" ", ""),
      code_length: 5,
    });

    if (result.success) {
      setPhone(data.phone);
    } else {
      alert(result.error);
    }
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
            error={showError}
            disabled={isSubmitting}
          />
        )}
      />

      <Button
        variant="default"
        size="lg"
        type="submit"
        disabled={!isValid || isSubmitting}
        className="desktop:mt-auto"
      >
        Далее
      </Button>
    </form>
  );
};
