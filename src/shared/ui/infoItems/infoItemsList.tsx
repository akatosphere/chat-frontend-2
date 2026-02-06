import { cn } from "@/shared/shadcn/lib/utils";

import { InfoItem } from "./infoItem";

type InfoItemsListProps = {
  className?: string;
  nickName?: string;
  phone?: string;
  birthday?: string;
  desctiption?: string;
};

export const InfoItemsList: React.FC<InfoItemsListProps> = ({
  className,
  nickName = "nickname",
  phone = "+7 989 898 89 89",
  birthday = "5 февраля 1996",
  desctiption = "Столяр ЕКБ, делаю мебель из натурального дерева",
}) => {
  return (
    <div className={cn("flex w-full flex-col rounded-lg bg-white", className)}>
      {nickName && <InfoItem title="Никнейм" text={nickName} className="text-primary" />}
      {phone && <InfoItem title="Номер телефона" text={phone} className="text-primary" />}
      {birthday && <InfoItem title="День рождения" text={birthday} className="text-black" />}
      {desctiption && <InfoItem title="День рождения" text={desctiption} className="text-black" />}
    </div>
  );
};
