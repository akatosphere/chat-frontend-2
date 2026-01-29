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
      const uids = selectedContacts.map((c) => c.uid);

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
      // 1. Удаляем из основного стора
      removeContactsFromStore(deletedUids);

      // 2. Сбрасываем режим выбора
      resetSelection();

      // 3. Инвалидируем кэш TanStack (чтобы синхронизировать с сервером)
      queryClient.invalidateQueries({ queryKey: ["contacts"] });

      // 4. Обновляем серверные пропсы
      router.refresh();
    },
    onError: (err: Error) => {
      console.error(err.message || "Ошибка при удалении");
      setIsModalOpen(false);
    },
  });
};
