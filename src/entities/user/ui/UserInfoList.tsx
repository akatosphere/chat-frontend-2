"use client";

import { User } from "@/entities/user/model/types";
import { formatPhone } from "@/shared/lib/formatPhone";
import { formatDate } from "@/shared/lib/hooks/formatDate";
import { cn } from "@/shared/shadcn/lib/utils";
import { InfoItem } from "@/shared/ui/infoItems/infoItem";

type UserInfoListProps = {
  className?: string;
  initialData: User | null;
};

export const UserInfoList: React.FC<UserInfoListProps> = ({ className, initialData }) => {
  // Дефолтные значения если данных нет (для состояния загрузки)
  const nickname = initialData?.nickname;
  const phone = formatPhone(initialData?.username);
  const birthday = initialData?.birthday ? formatDate(initialData.birthday) : undefined;
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
