import { useQuery } from "@tanstack/react-query";

import { getInviteLink } from "@/entities/chat/api/getInviteLink";

type InviteResponse = {
  chat_key: string;
  chat_type: string;
  invite_link: string;
  expires_at: number;
};

const emptyInviteResponse: InviteResponse = {
  chat_key: "",
  chat_type: "",
  invite_link: "",
  expires_at: 0,
};

export const useInviteLink = (chatKey: string | undefined) => {
  return useQuery({
    queryKey: ["inviteLink", chatKey],
    queryFn: async () => {
      if (!chatKey) return emptyInviteResponse;

      const response = await getInviteLink(chatKey);
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch invite link");
      }
      return response.data as InviteResponse;
    },
    enabled: !!chatKey,
    placeholderData: emptyInviteResponse,
    refetchOnWindowFocus: false,
  });
};
