"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getChatPreview } from "@/entities/chat/api/getChatPreview";
import { Avatar } from "@/entities/chat/ui/avatar";
import { handleInviteLinkClick } from "@/features/chat/chat/lib/handleInviteLinkClick";

type InviteLinkPreviewProps = {
  chatKey: string;
  token: string;
};

export const InviteLinkPreview = ({ chatKey, token }: InviteLinkPreviewProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chatPreview", token],
    queryFn: async () => {
      const response = await getChatPreview(token);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  if (isError) return null;

  if (isLoading || !data) {
    return (
      <div className="mx-3 mt-1.5">
        <div className="flex animate-pulse items-start gap-1 rounded border-l-4 border-[#9587F5] bg-white/50 p-1 px-2.5">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  const isChannel = chatKey.startsWith("channel");
  const subtitle =
    data.description || `${data.participantsCount} ${isChannel ? "подписчиков" : "участников"}`;

  return (
    <div className="mx-3 mt-1.5">
      <div
        className="cursor-pointer"
        onClick={() => handleInviteLinkClick(`/chats/${chatKey}?token=${token}`, router)}
      >
        <div className="border-primary flex items-start gap-1 rounded border-l-4 bg-white/50 p-1 px-2.5">
          <Avatar avatarUrl={data.avatarUrl} size="sm" variant="chat" />
          <div className="flex flex-col gap-0.5">
            <span className="text-primary text-sm leading-[130%] font-bold">{data.name}</span>
            <span className="text-gray text-base leading-[130%]">{subtitle}</span>
            <span className="text-primary text-base leading-[120%] font-medium uppercase">
              {isChannel ? "Перейти в канал" : "Перейти в группу"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
