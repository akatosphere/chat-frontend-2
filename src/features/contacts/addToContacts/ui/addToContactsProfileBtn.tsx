"use client";
import PlusInCircle from "@icons/plusInCircle.svg";
import { useCallback, useState } from "react";

import { Button } from "@/shared/shadcn/ui/button";
import { Toast } from "@/shared/toast/ui/toast";

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
  const [showToast, setShowToast] = useState(false);

  const handleAddToContacts = () => {
    mutate(
      { phone, first_name: firstName, last_name: lastName },
      {
        onSuccess: (res) => {
          if (res.success) {
            setShowToast(true);
          }
        },
      },
    );
  };

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon-auto"
        className="text-primary hover:text-primary-secondary smooth"
        onClick={handleAddToContacts}
      >
        <PlusInCircle className="h-5 w-5" />
        <p className="subtext">Добавить в контакты</p>
      </Button>
      {showToast && (
        <Toast
          message="Пользователь успешно добавлен в контакты"
          onClose={handleToastClose}
          icon={{
            mobile: "/icons/toast/checkMobile.svg",
            desktop: "/icons/toast/checkDesktop.svg",
          }}
        />
      )}
    </>
  );
};
