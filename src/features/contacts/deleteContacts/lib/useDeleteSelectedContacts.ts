// features/contacts/deleteContacts/lib/useDeleteSelectedContacts.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteContact } from "@/entities/contact/api/deleteContact";
import { useContactStore } from "@/entities/contact/model/store";
import { useSelectContactsStore } from "@/features/contacts/model/SelectContactsStore";

export const useDeleteSelectedContacts = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const selectedContacts = useSelectContactsStore((s) => s.selected);
  const resetSelection = useSelectContactsStore((s) => s.reset);
  const setIsModalOpen = useSelectContactsStore((s) => s.setIsModalOpen);
  const removeContactsFromStore = useContactStore((s) => s.removeContacts);

  return useMutation({
    mutationFn: async () => {
      const uids = selectedContacts.map((c) => c.systemUid);

      // Запускаем все запросы параллельно
      const results = await Promise.all(uids.map((uid) => deleteContact(uid)));

      // Проверяем, есть ли хотя бы одна ошибка
      const firstError = results.find((r) => !r.success);
      if (firstError) {
        throw new Error(firstError.error);
      }

      return uids;
    },
    onSuccess: (deletedUids) => {
      setIsModalOpen(false);

      // Инвалидируем кэш TanStack (чтобы синхронизировать с сервером)
      queryClient.invalidateQueries({ queryKey: ["contacts"] });

      // Обновляем серверные пропсы
      router.refresh();

      // Удаляем из основного стора
      removeContactsFromStore(deletedUids);

      // Сбрасываем режим выбора
      resetSelection();
    },
    onError: (err: Error) => {
      console.error(err.message || "Ошибка при удалении");
      setIsModalOpen(false);
    },
  });
};
