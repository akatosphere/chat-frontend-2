import PlusInCircle from "@icons/plusInCircle.svg";

import { Button } from "@/shared/shadcn/ui/button";

import { useAddToContacts } from "../lib/useAddToContacts";

type AddToContactsProfileBtnProps = {
  className?: string;
  phone: string;
  firstName: string;
  lastName: string;
};

export const AddToContactsProfileBtn: React.FC<AddToContactsProfileBtnProps> = ({
  phone,
  firstName,
  lastName,
}) => {
  const { mutate } = useAddToContacts();

  const handleAddToContacts = () => {
    mutate({ phone, first_name: firstName, last_name: lastName });
  };

  return (
    <Button
      variant="ghost"
      size="icon-auto"
      className="text-primary hover:text-primary-secondary smooth"
      onClick={handleAddToContacts}
    >
      <PlusInCircle className="h-5 w-5" />
      <p className="subtext">Добавить в контакты</p>
    </Button>
  );
};
