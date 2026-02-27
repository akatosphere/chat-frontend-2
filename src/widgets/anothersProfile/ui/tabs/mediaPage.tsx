import React, { useEffect, useMemo } from "react";

import { useChatStore } from "@/entities/chat/model/useChatStore";
import { MappedMessageFile } from "@/features/chat/chat/model/types/mappedTypes";
import { cn } from "@/shared/shadcn/lib/utils";
import ImageGallery from "@/shared/ui/ImageGallery/ImageGallery";

type MediaPageProps = {
  className?: string;
};

export const MediaPage: React.FC<MediaPageProps> = ({ className }) => {
  // Достаем селекторы по отдельности для оптимизации
  const media = useChatStore((state) => state.media);
  const isLoadingMedia = useChatStore((state) => state.isLoadingMedia);
  const fetchMedia = useChatStore((state) => state.fetchMedia);
  const chatKey = useChatStore((state) => state.chatKey);
  const clearMessages = useChatStore((state) => state.clearMessages);

  useEffect(() => {
    if (chatKey) {
      fetchMedia(chatKey);
    }

    // Очищаем медиа в сторе при уходе с вкладки или смене чата,
    // чтобы не видеть старые фото, пока грузятся новые
    return () => {
      clearMessages();
    };
  }, [chatKey, fetchMedia, clearMessages]);

  const formattedImages = useMemo(() => {
    // Сет для фильтрации возможных дубликатов по ссылке
    const seen = new Set<string>();

    return media
      .map((file: MappedMessageFile & { file_url?: string }) => ({
        id: file.uid,
        src: file.file_url || file.fileUrl || "",
      }))
      .filter((img) => {
        if (!img.src || seen.has(img.src)) return false;
        seen.add(img.src);
        return true;
      });
  }, [media]);

  return (
    <div className={cn("flex h-full w-full flex-col bg-white", className)}>
      {/* Если идет загрузка и данных еще нет — показываем лоадер */}
      {isLoadingMedia && formattedImages.length === 0 ? (
        <div className="text-muted-foreground flex flex-1 items-center justify-center text-center text-sm">
          Загрузка медиа...
        </div>
      ) : /* Если загрузка завершена и данных нет — показываем заглушку */
      formattedImages.length === 0 ? (
        <div className="text-muted-foreground flex flex-1 items-center justify-center text-center text-sm">
          Медиафайлов пока нет
        </div>
      ) : (
        /* Если данные есть — рендерим галерею */
        <div className="flex-1 overflow-y-auto">
          <ImageGallery images={formattedImages} />
        </div>
      )}
    </div>
  );
};
