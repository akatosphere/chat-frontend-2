"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/shadcn/ui/button";
import { FormInput } from "@/shared/form/ui/formInput";
import { UserFormData, userFormSchema } from "../model/validation";
import { useForm } from "react-hook-form";
import { useUserFormStore } from "../model/store";
import Link from "next/link";

type UserFormProps = {
  className?: string;
};

export const UserForm: React.FC<UserFormProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      nickname: "",
    },
  });

  const setUser = useUserFormStore((state) => state.setUser);
  const onSubmit = (data: UserFormData) => {
    setUser(data);
    reset();
  };

  watch();
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
            Нажимая на «Зарегистрироваться», вы соглашаетесь c{" "}
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
          <Button variant="default" size="lg" type="submit" disabled={!isValid}>
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
};
