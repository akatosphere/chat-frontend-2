"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Avatar } from "@/entities/chat/ui/avatar";
import { uploadAvatar } from "@/features/auth/userForm/api/changeAvatar";
import {
  MessengerProfileResponse,
  updateMessengerProfile,
} from "@/features/auth/userForm/api/updateUserProfile";
import { FormInput } from "@/shared/form/ui/formInput";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { Select } from "../select/select";
import { DAYS, MONTHS, YEARS } from "./constants";
import { changeProfileSchema } from "./schema";

type UserProfileFormProps = {
  className?: string;
  profile: MessengerProfileResponse;
  avatarUrl: string;
  name: string;
  phone: string;
  lastName: string;
  nickname: string;
  description: string;
  birthday: number; // Timestamp в ms
};

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  className,
  profile,
  avatarUrl,
  name,
  lastName,
  nickname,
  description,
  birthday,
}) => {
  const [isAvatarChangeModalOpen, setIsAvatarChangeModalOpen] = useState(false);

  // Инициализация defaultValues для birthday
  let defaultBirthday = { day: 1, month: 1, year: 2000 }; // Fallback
  if (birthday) {
    const date = new Date(birthday * 1000);
    defaultBirthday = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  const {
    register,
    handleSubmit,
    control, // Для Controller
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<z.infer<typeof changeProfileSchema>>({
    resolver: zodResolver(changeProfileSchema),
    mode: "onChange",
    defaultValues: {
      name,
      lastName,
      description,
      nickname,
      birthday: defaultBirthday,
    },
  });

  const onSubmit = async (data: z.infer<typeof changeProfileSchema>) => {
    try {
      let timestamp = birthday;
      if (data.birthday) {
        const birthDate = new Date(
          Date.UTC(data.birthday.year, data.birthday.month - 1, data.birthday.day),
        );
        timestamp = Math.floor(birthDate.getTime() / 1000);
      }

      const res = await updateMessengerProfile({
        nickname: data.nickname.trim(),
        first_name: data.name.trim(),
        last_name: data.lastName.trim(),
        patronymic: "",
        additional_information: data.description?.trim() || "",
        birthday: timestamp,
        gender: profile.gender,
        country: profile.country,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onAvatarChange = async (file: File) => {
    const res = await uploadAvatar(file);
    console.log(res);
  };

  return (
    <div className={cn("", className)}>
      <div className="mb-4 flex flex-col items-center gap-2">
        <Avatar size="xl" avatarUrl={avatarUrl} />
        <Button
          variant={"text"}
          size={"inline"}
          className="text-[17px] font-medium"
          onClick={() => setIsAvatarChangeModalOpen(true)}
        >
          Изменить фото
        </Button>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormInput id="name" label="Изменить имя" className="border-0" {...register("name")} />
        <FormInput id="lastName" label="Изменить фамилию" {...register("lastName")} />
        <FormInput
          id="nickname"
          label="Изменить никнейм"
          className="border-0"
          {...register("nickname")}
        />
        <div className="flex gap-1">
          <Controller
            name="birthday.day"
            control={control}
            render={({ field }) => (
              <Select
                options={DAYS}
                value={field.value}
                onChange={field.onChange}
                placeholder="День"
                className="w-[80px] max-w-[80px] min-w-[80px]"
              />
            )}
          />
          <Controller
            name="birthday.month"
            control={control}
            render={({ field }) => (
              <Select
                options={MONTHS}
                value={field.value}
                onChange={field.onChange}
                placeholder="Месяц"
                className="w-[133px] max-w-[133px] min-w-[133px]"
              />
            )}
          />
          <Controller
            name="birthday.year"
            control={control}
            render={({ field }) => (
              <Select
                options={YEARS}
                value={field.value}
                onChange={field.onChange}
                placeholder="Год"
                className="w-full"
              />
            )}
          />
        </div>
        <FormInput
          id="description"
          label="Изменить описание"
          className="border-0"
          {...register("description")}
        />
        {errors.birthday && <p className="text-red-500">{errors.birthday.message}</p>}
        <Button variant={"default"} size={"lg"} disabled={!isValid || !isDirty || isSubmitting}>
          Сохранить
        </Button>
      </form>
      {isAvatarChangeModalOpen && (
        <ModalDialog open={isAvatarChangeModalOpen} onOpenChange={setIsAvatarChangeModalOpen}>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const formData = new FormData(e.currentTarget);
              const file = formData.get("avatar") as File | null;

              if (file) {
                onAvatarChange(file);
                setIsAvatarChangeModalOpen(false);
              }
            }}
          >
            <input type="file" accept="image/*" name="avatar" />
            <button type="submit">Загрузить аватар</button>
          </form>
        </ModalDialog>
      )}
    </div>
  );
};
