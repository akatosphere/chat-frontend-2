"use client";

import { MappedChatDetails } from "@/entities/chat/lib/mapChat";
import { Avatar } from "@/entities/chat/ui/avatar";
import { ChatInfoList } from "@/entities/chat/ui/chatInfoList";
import { useUserStore } from "@/entities/user/model/userStore";
import { pluralize } from "@/shared/lib/pluralize";
import { useIsMobileStore } from "@/shared/model/isMobile.store";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";

import { useChatProfileContextMenu } from "../lib/useChatProfileContextMenu";

type ChatProfileProps = {
  initialData: MappedChatDetails | null;
};

export const ChatProfile: React.FC<ChatProfileProps> = ({ initialData }) => {
  const currentUserUid = useUserStore((s) => s.userId);
  const isOwner = currentUserUid === initialData?.createdBy;
  const isMobile = useIsMobileStore((state) => state.isMobile);
  const chatType =
    initialData?.type === "private-group" || initialData?.type === "public-group"
      ? "group"
      : "channel";
  const title = chatType === "channel" ? "Информация о канале" : "Информация о группе";
  const contextMenu = useChatProfileContextMenu({
    isOwner,
    chatType,
    chatKey: initialData?.chatKey || "",
    chatName: initialData?.title || "",
    fullChatType: initialData?.type || "chat",
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
        backButton={isMobile}
        contextMenuHook={() => contextMenu}
      />
      <SidebarContainer className="" scrollbar={isMobile}>
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
        <div className="px-4 pt-2">
          <ChatInfoList initialData={initialData} />
        </div>
      </SidebarContainer>
    </>
  );
};
