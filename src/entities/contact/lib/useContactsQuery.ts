import { useInfiniteQuery } from "@tanstack/react-query";

import { getContacts } from "../api/getContacts";
import { ContactListResponse } from "../model/types";

export const useContactsQuery = (initialData?: ContactListResponse | null) => {
  return useInfiniteQuery({
    queryKey: ["contacts"],
    queryFn: ({ pageParam }) => getContacts(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    // Если данные пришли с сервера, используем их для мгновенной отрисовки
    initialData: initialData ? { pages: [initialData], pageParams: [undefined] } : undefined,
  });
};
