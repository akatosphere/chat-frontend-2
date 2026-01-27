"use client";

import { useMutation } from "@tanstack/react-query";

import { addToContacts } from "@/entities/contact/api/addToContacts";
import { useContactStore } from "@/entities/contact/model/store";
import { AddByPhonePayload } from "@/entities/contact/model/types";

export const useAddToContacts = () => {
  const addContactsToStore = useContactStore((s) => s.addContacts);

  return useMutation({
    mutationFn: (payload: AddByPhonePayload) => addToContacts(payload),
    onSuccess: (res) => {
      if (res.success) {
        // Мгновенно добавляем в стор для отображения в списке
        addContactsToStore([res.data]);
        console.log("Контакт успешно добавлен");
      } else {
        console.error(res.error);
      }
    },
    onError: () => {
      console.error("Произошла ошибка при добавлении");
    },
  });
};
