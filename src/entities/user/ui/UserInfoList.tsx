"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { User } from "@/entities/user/model/types";
import { cn } from "@/shared/shadcn/lib/utils";
import { InfoItem } from "@/shared/ui/infoItems/infoItem";

const formatBirthday = (timestamp: number | null): string => {
  if (!timestamp) return "";

  try {
    const date = new Date(timestamp * 1000); // Unix timestamp в миллисекунды
    if (isNaN(date.getTime())) return "";
    return format(date, "d MMMM yyyy", { locale: ru }); // "5 февраля 1996"
  } catch {
    return "";
  }
};

type UserInfoListProps = {
  className?: string;
  initialData: User | null;
};

export const UserInfoList: React.FC<UserInfoListProps> = ({ className, initialData }) => {
  // Дефолтные значения если данных нет (для состояния загрузки)
  const nickname = initialData?.nickname;
  const phone = initialData?.username;
  const birthday = initialData?.birthday ? formatBirthday(initialData.birthday) : undefined;
  const bio = initialData?.bio;

  return (
    <div className={cn("flex w-full flex-col rounded-lg bg-white", className)}>
      {nickname && <InfoItem title="Никнейм" text={nickname} className="text-primary" />}
      {phone && <InfoItem title="Номер телефона" text={phone} className="text-primary" />}
      {birthday && <InfoItem title="День рождения" text={birthday} className="text-black" />}
      {bio && <InfoItem title="Описание" text={bio} className="text-black" />}
    </div>
  );
};
