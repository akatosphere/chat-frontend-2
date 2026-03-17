"use client";

import Close from "@icons/close.svg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { getChatPreview } from "@/entities/chat/api/getChatPreview";
import { joinByInviteLink } from "@/entities/chat/api/joinByInviteLink";
import { ChatPreview } from "@/entities/chat/model/types";
import { ModalDialog } from "@/shared/modalDialog/ui/modalDialog";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";

type ChatPreviewModalProps = {
  chatKey: string;
  preview: ChatPreview;
  token: string;
};

export const ChatPreviewModal: React.FC<ChatPreviewModalProps> = ({ chatKey, preview, token }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isChannel = chatKey.startsWith("channel");

  const handleClose = () => {
    router.back();
  };

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      await joinByInviteLink(token);
      router.refresh();
    } catch {
      setIsLoading(false);
    }
  };

  const countText = isChannel
    ? `${preview.participantsCount} подписчиков`
    : `${preview.participantsCount} участников`;

  const buttonText = isChannel ? "Подписаться" : "Вступить в группу";

  return (
    <ModalDialog
      className="desktop:w-[441px] desktop:max-w-[441px]"
      open={true}
      onOpenChange={handleClose}
    >
      <AlertDialogHeader>
        <AlertDialogTitle className="flex justify-end">
          <button onClick={handleClose} aria-label="Закрыть">
            <Close className="h-6 w-6 cursor-pointer text-[#747474] transition duration-200 hover:opacity-80" />
          </button>
        </AlertDialogTitle>
        <AlertDialogDescription />
        <div className="flex flex-col items-center gap-5">
          <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full">
            <Image
              src={preview.avatarUrl || "/chat/avatarGroup.svg"}
              fill
              alt="аватар"
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col items-center gap-0.5">
            <span className="text-center text-2xl leading-[130%] font-medium tracking-[0.01em] text-[#1C1C1E]">
              {preview.name}
            </span>
            <span className="text-center text-base leading-[130%] tracking-[0.01em] text-[#747474]">
              {countText}
            </span>
          </div>

          {preview.description && (
            <div className="w-full rounded-xl bg-[#F5F6F8] px-2.5 py-2">
              <span className="block text-xs leading-[120%] tracking-[0.01em] text-[#747474]">
                Описание
              </span>
              <span className="block text-base leading-[130%] tracking-[0.01em] text-[#1C1C1E]">
                {preview.description}
              </span>
            </div>
          )}

          <button
            onClick={handleJoin}
            disabled={isLoading}
            className="flex h-[60px] w-full items-center justify-center rounded-2xl bg-[#7769E1] px-6 text-lg leading-[120%] font-medium tracking-[0.01em] text-white disabled:opacity-70"
          >
            {isLoading ? "Загрузка..." : buttonText}
          </button>
        </div>
      </AlertDialogHeader>
    </ModalDialog>
  );
};

export const ChatPreviewClientLoader: React.FC<{ chatKey: string }> = ({ chatKey }) => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["chatPreview", token],
    queryFn: async () => {
      const result = await getChatPreview(token);
      return result.success ? result.data : null;
    },
    enabled: !!token,
  });

  if (!token || (!isLoading && !data)) {
    return (
      <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
        Чат не найден
      </div>
    );
  }

  if (isLoading || !data) return null;

  return <ChatPreviewModal chatKey={chatKey} preview={data} token={token} />;
};
