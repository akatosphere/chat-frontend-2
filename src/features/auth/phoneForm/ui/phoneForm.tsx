"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { sendCode } from "../api/sendCode";
import { savePhoneToCookie } from "../lib/actions/savePhoneToCookie";
import { PhoneData, phoneSchema } from "../model/schema";
import { usePhoneStore } from "../model/store";
import { PhoneInput } from "./phoneInput";

type PhoneFormProps = {
  className?: string;
};

export const PhoneForm: React.FC<PhoneFormProps> = ({ className }) => {
  const setPhone = usePhoneStore((state) => state.setPhone);

  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPhone, setPendingPhone] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
    mode: "onChange",
    defaultValues: { phone: "" },
  });

  const showError = !isFocused && touchedFields.phone ? errors.phone?.message : "";

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

  const openModalHandler = () => {
    const phone = getValues("phone");
    if (!isValid) return;

    setPendingPhone(phone);
    setOpenModal(true);
  };

  return (
    <form className={cn("flex h-full flex-col gap-4", className)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            id="phone"
            value={field.value}
            onChange={field.onChange}
            onBlur={() => {
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
        type="button"
        disabled={!isValid || isSubmitting || isLoading}
        className="desktop:mt-auto"
        onClick={openModalHandler}
      >
        Далее
      </Button>
      <ModalDialog
        title={pendingPhone}
        description="Номер телефона указан верно?"
        cancelBtnText="Изменить"
        actionBtnText="Верно"
        open={openModal}
        onOpenChange={setOpenModal}
        onConfirm={() => handleSubmit(onSubmit)()}
      />
    </form>
  );
};
