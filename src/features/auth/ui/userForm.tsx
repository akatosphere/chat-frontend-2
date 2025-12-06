"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { useState } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { FormInput } from "@/shared/form/ui/formInput";
import { firstNameSchema, nickNameSchema } from "../model/validation";

type UserFormProps = {
  className?: string;
};

export const UserForm: React.FC<UserFormProps> = ({ className }) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState("");

  const [isValid, setIsValid] = useState(false);

  // Функции валидации конкретного поля
  const validateFirstName = (value: string) => {
    const result = firstNameSchema.safeParse(value);
    return result.success ? "" : result.error.issues[0].message;
  };

  const validateNickName = (value: string) => {
    const result = nickNameSchema.safeParse(value);
    return result.success ? "" : result.error.issues[0].message;
  };

  // Обработчики изменения инпутов
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFirstName(val);
    const err = validateFirstName(val);
    setFirstNameError(err);
    setIsValid(!err && !nickNameError);
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNickName(val);
    const err = validateNickName(val);
    setNickNameError(err);

    setIsValid(!err && !firstNameError);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("Форма отправлена:", { firstName, nickName });
    setFirstName("");
    setFirstNameError("");
    setNickName("");
    setNickNameError("");
    setIsValid(false);
  };
  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
    >
      <FormInput
        id="firstName"
        value={firstName}
        onChange={handleFirstNameChange}
        label="Введите имя"
        error={firstNameError}
      />
      <FormInput
        id="nickName"
        value={nickName}
        onChange={handleNickNameChange}
        label="Придумайте никнейм"
        error={nickNameError}
      />
      <Button variant="default" size="lg" type="submit" disabled={!isValid}>
        Далее
      </Button>
    </form>
  );
};
