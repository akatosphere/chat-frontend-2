"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { Button } from "@/shared/shadcn/ui/button";

import { useVerificationStore } from "../../codeVerification/model/userVerificationStore";
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
  const { resetVerification } = useVerificationStore();

  const showError = !isFocused && touchedFields.phone ? errors.phone?.message : "";

  const handleFormAttemptSubmit = () => {
    const phone = getValues("phone");
    if (!isValid) return;

    setPendingPhone(phone);
    setOpenModal(true);
  };

  const onSubmit = async (data: PhoneData) => {
    setIsLoading(true);
    setOpenModal(false);
    const result = await sendCode({
      phone_number: data.phone.replaceAll(" ", ""),
      code_length: 5,
    });

    if (result.success) {
      setPhone(data.phone);
      resetVerification();
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
    <form
      className={cn("flex h-full flex-col gap-4", className)}
      onSubmit={(e) => {
        e.preventDefault();
        handleFormAttemptSubmit();
      }}
    >
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
        type="submit"
        disabled={!isValid || isSubmitting || isLoading}
        className="desktop:mt-auto"
        onClick={openModalHandler}
      >
        Далее
      </Button>
      <ModalDialog open={openModal} onOpenChange={setOpenModal} overlay="card">
        <AlertDialogHeader className="desktop:mt-0 mt-2">
          <AlertDialogTitle className="text-tight font-medium text-black">
            {pendingPhone}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-gray subtext-tight desktop:mb-4 font-normal">
          Номер телефона указан верно?
        </AlertDialogDescription>
        <AlertDialogFooter className="desktop:gap-2 flex-row justify-end gap-6">
          <Button
            variant="outline"
            size="sm"
            className="desktop:flex-0 flex flex-1"
            onClick={() => setOpenModal(false)}
          >
            Изменить
          </Button>
          <Button
            variant="default"
            size="sm"
            className="desktop:flex-0 flex flex-1"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Верно
          </Button>
        </AlertDialogFooter>
      </ModalDialog>
    </form>
  );
};
