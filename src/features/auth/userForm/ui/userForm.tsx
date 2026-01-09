"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { FormInput } from "@/shared/form/ui/formInput";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { checkNickname } from "../api/checkNickname";
import { updateMessengerProfile } from "../api/updateUserProfile";
import { useUserFormStore } from "../model/store";
import { nicknameSchema, UserFormData, userFormSchema } from "../model/validation";

type UserFormProps = {
  className?: string;
};

export const UserForm: React.FC<UserFormProps> = ({ className }) => {
  const router = useRouter();
  const setUser = useUserFormStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      nickname: "",
    },
  });

  const nickname = watch("nickname");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!nicknameSchema.safeParse(nickname).success) {
      clearErrors("nickname");
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const result = await checkNickname(nickname.trim());

      if (!result.success) {
        setError("nickname", {
          type: "manual",
          message: result.error,
        });
      } else {
        clearErrors("nickname");
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [nickname, setError, clearErrors]);

  const onSubmit = async (data: UserFormData) => {
    const result = await updateMessengerProfile({
      first_name: data.firstName.trim(),
      nickname: data.nickname.trim(),
    });

    if (!result.success) {
      alert(result.error);
      return;
    }

    setUser(data);
    reset();
    document.cookie = "is_filled=true; path=/";
    router.push("/auth/success");
  };

  const isFormValid = isValid && !errors.nickname;

  return (
    <div className={cn("h-full", className)}>
      <form
        className="flex h-full flex-col place-content-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <FormInput
            id="firstName"
            label="Введите имя"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <FormInput
            id="nickname"
            label="Придумайте никнейм"
            error={errors.nickname?.message}
            {...register("nickname")}
          />
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <p className="caption text-gray font-medium">
            Нажимая на «Зарегистрироваться», вы соглашаетесь c{" "}
            <Button type="button" variant="text" size="inline" className="caption" asChild>
              <Link href="https://achat.ktsf.ru/agreement" target="_blank">
                Пользовательским соглашением
              </Link>
            </Button>
            .
          </p>

          <Button variant="default" size="lg" type="submit" disabled={!isFormValid}>
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
};
