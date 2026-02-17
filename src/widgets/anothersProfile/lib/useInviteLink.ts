import { useQuery } from "@tanstack/react-query";

import { getInviteLink } from "@/entities/chat/api/getInviteLink";

// Определим интерфейс ответа для типизации
interface InviteResponse {
  chat_key: string;
  chat_type: string;
  invite_link: string;
  expires_at: number;
}

export const useInviteLink = (chatKey: string | undefined) => {
  return useQuery({
    queryKey: ["inviteLink", chatKey],
    queryFn: async () => {
      if (!chatKey) throw new Error("Chat key is required");

      const response = await getInviteLink(chatKey);
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch invite link");
      }
      return response.data as InviteResponse;
    },
    enabled: !!chatKey,
    refetchOnWindowFocus: false,
  });
};
