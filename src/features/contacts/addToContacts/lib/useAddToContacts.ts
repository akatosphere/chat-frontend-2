"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

import { addToContacts } from "@/entities/contact/api/addToContacts";
import { useContactStore } from "@/entities/contact/model/store";
import { AddByPhonePayload } from "@/entities/contact/model/types";

export const useAddToContacts = () => {
  const addContactsToStore = useContactStore((s) => s.addContacts);
  const queryClient = useQueryClient();
  const onSuccessCallbackRef = useRef<(() => void) | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: (payload: AddByPhonePayload) => addToContacts(payload),
    onSuccess: (res) => {
      if (res.success) {
        // Мгновенно добавляем в стор для отображения в списке
        addContactsToStore([res.data]);
        // ИНВАЛИДИРУЕМ КЭШ (чтобы TanStack Query забыл старые данные)
        queryClient.invalidateQueries({ queryKey: ["contacts"] });
        // Вызываем переданный callback если есть
        onSuccessCallbackRef.current?.();
      } else {
        console.error(res.error);
      }
    },
    onError: () => {
      console.error("Произошла ошибка при добавлении");
    },
  });

  const mutateWithCallback = useCallback(
    (payload: AddByPhonePayload, onSuccess?: () => void) => {
      onSuccessCallbackRef.current = onSuccess;
      mutation.mutate(payload);
    },
    [mutation],
  );

  return { ...mutation, mutate: mutateWithCallback };
};
