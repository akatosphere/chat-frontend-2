"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/shadcn/ui/button";
import { FormInput } from "@/shared/form/ui/formInput";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  nicknameSchema,
  UserFormData,
  userFormSchema,
} from "../model/validation";
import { useUserFormStore } from "../model/store";
import { updateMessengerProfile } from "../api/updateUserProfile";
import { useRouter } from "next/navigation";
import { checkNickname } from "../api/checkNickname";

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
    router.push("/chat");
  };

  const isFormValid = isValid && !errors.nickname;

  return (
    <div className={cn("h-full", className)}>
      <form
        className="flex flex-col h-full place-content-between"
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

        <div className="flex flex-col gap-4 mt-auto">
          <p className="caption font-medium text-gray">
            Нажимая на «Зарегистрироваться», вы соглашаетесь c{" "}
            <Button
              type="button"
              variant="text"
              size="inline"
              className="caption"
              asChild
            >
              <Link href="https://achat.ktsf.ru/agreement" target="_blank">
                Пользовательским соглашением
              </Link>
            </Button>
            .
          </p>

          <Button
            variant="default"
            size="lg"
            type="submit"
            disabled={!isFormValid}
          >
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
};
