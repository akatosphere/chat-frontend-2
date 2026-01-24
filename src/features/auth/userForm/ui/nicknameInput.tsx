"use client";

import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { checkNickname } from "@/entities/user/api/checkNicknameUnique";
import { FormInput } from "@/shared/form/ui/formInput";
import { cn } from "@/shared/shadcn/lib/utils";

import { nicknameSchema } from "../model/validation";
import { UserFormData } from "../model/validation";

type NicknameInputProps = {
  name: "nickname";
  label?: string;
  isBordered?: boolean;
};

export const NicknameInput: React.FC<NicknameInputProps> = ({
  name,
  label = "Придумайте никнейм",
  isBordered = true,
}) => {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<UserFormData>();

  const nickname = watch(name);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!nicknameSchema.safeParse(nickname).success) {
      clearErrors(name);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      const result = await checkNickname(nickname.trim());

      if (!result.success) {
        setError(name, {
          type: "manual",
          message: result.error,
        });
      } else {
        clearErrors(name);
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [nickname, name, setError, clearErrors]);

  return (
    <FormInput
      id={name}
      label={label}
      error={errors[name]?.message}
      {...register(name)}
      inputClassName={cn(!isBordered && "desktop:border-0 font-normal")}
    />
  );
};
