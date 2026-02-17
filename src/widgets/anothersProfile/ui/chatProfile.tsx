"use client";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { Avatar } from "@/entities/chat/ui/avatar";
import { ChatInfoList } from "@/entities/chat/ui/chatInfoList";
import { useUserStore } from "@/entities/user/model/userStore";
import { ProfileNotifications } from "@/features/notifications/ui/profileNotifications";
import { pluralize } from "@/shared/lib/pluralize";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/shadcn/ui/tabs";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { useChatProfileContextMenu } from "../lib/useChatProfileContextMenu";
import { useProfileClose } from "../lib/useProfileClose";
import { useAnothersProfileUIStore } from "../model/anothersProfileUIStore";
import { MediaPage } from "./mediaPage";
import { ParticipantsPage } from "./participantsPage";

type ChatProfileProps = {
  initialData: MappedChatDetails | null;
};

export const ChatProfile: React.FC<ChatProfileProps> = ({ initialData }) => {
  const currentUserUid = useUserStore((s) => s.userId);
  const isOwner = currentUserUid === initialData?.createdBy;
  const chatKey = initialData?.chatKey || "";
  const isMobile = useIsMobileStore((state) => state.isMobile);
  const closeProfile = useProfileClose();
  const chatType =
    initialData?.type === "private-group" || initialData?.type === "public-group"
      ? "group"
      : "channel";
  const activeSection = useAnothersProfileUIStore((s) => s.activeSection);
  const title = chatType === "channel" ? "Информация о канале" : "Информация о группе";
  const contextMenu = useChatProfileContextMenu({
    isOwner,
    chatType,
    chatKey,
    chatName: initialData?.title || "",
    fullChatType: initialData?.type || "chat",
    chatId: initialData?.id || null,
  });

  const getMembersLabel = () => {
    if (!initialData) return "";
    const count = initialData.membersCount + 1;
    if (chatType === "channel") {
      return `${count} ${pluralize(count, "подписчик", "подписчика", "подписчиков")}`;
    }
    return `${count} ${pluralize(count, "участник", "участника", "участников")}`;
  };

  return (
    <>
      <SidebarHeader
        title={title}
        closeButton={!isMobile}
        closeButtonFn={!isMobile ? closeProfile : undefined}
        backButton={isMobile}
        contextMenu={contextMenu}
      />
      <SidebarContainer className="desktop:p-0 p-4" scrollbar={isMobile}>
        <div className="relative">
          <Avatar
            size="anothersProfileAvatar"
            className="flex w-full justify-center"
            avatarUrl={initialData?.avatar}
            variant="user"
          />
          <div className="absolute bottom-3 left-4 text-white">
            <p className="title font-medium">{initialData?.title}</p>
            <p className="text">{getMembersLabel()}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 px-4 pt-4 pb-2">
          <ProfileNotifications />
          <ChatInfoList initialData={initialData} isOwner={isOwner} />
        </div>
        <Tabs defaultValue={activeSection}>
          <TabsList
            variant="line"
            className="border-light-gray scrollbar-hover w-full transform-[rotateX(180deg)] flex-nowrap overflow-x-auto overflow-y-hidden border-t pt-0"
          >
            <TabsTrigger value="participants" className="transform-[rotateX(180deg)]">
              Участники
            </TabsTrigger>
            <TabsTrigger value="media" className="transform-[rotateX(180deg)]">
              Медиа
            </TabsTrigger>
            <TabsTrigger value="files" className="transform-[rotateX(180deg)]">
              Файлы
            </TabsTrigger>
            <TabsTrigger value="voices" className="transform-[rotateX(180deg)]">
              Голосовые
            </TabsTrigger>
            <TabsTrigger value="links" className="transform-[rotateX(180deg)]">
              Ссылки
            </TabsTrigger>
          </TabsList>
          <TabsContent value="participants">
            <ParticipantsPage />
          </TabsContent>
          <TabsContent value="media">
            <MediaPage />
          </TabsContent>
        </Tabs>
      </SidebarContainer>
    </>
  );
};
