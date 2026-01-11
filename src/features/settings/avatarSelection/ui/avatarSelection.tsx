"use client";

import Plus from "@icons/plus.svg";

import { Avatar } from "@/entities/chat/ui/avatar";
import { Button } from "@/shared/shadcn/ui/button";

import { AvatarSelectionModal } from "../../../../entities/settings/avatarSelectionModal/avatarSelectionModal";

type AvatarSectionProps = {
  avatarUrl: string;
  error?: string;
  isAvatarChangeModalOpen: boolean;
  setIsAvatarChangeModalOpen: (value: boolean) => void;
  onAvatarChange: (file: File) => void;
};

export const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatarUrl,
  error,
  isAvatarChangeModalOpen,
  setIsAvatarChangeModalOpen,
  onAvatarChange,
}) => {
  return (
    <div className="relative mb-4 flex flex-col items-center gap-2">
      <Avatar size="settingsAvatar" className="flex w-full justify-center" avatarUrl={avatarUrl} />
      <Button
        variant="text"
        size="inline"
        className="bg-primary desktop:bg-transparent desktop:p-0 desktop:text-primary desktop:static desktop:rounded-none desktop:text-[17px] minitext absolute bottom-4 left-4 rounded-md px-3 py-3.5 font-medium text-white"
        onClick={() => setIsAvatarChangeModalOpen(true)}
      >
        <div className="flex items-center">
          <Plus className="desktop:hidden desktop:mr-0 mr-2 h-3.5 w-3.5" />
          <span className="leading-none">Изменить фото</span>
        </div>
      </Button>

      {isAvatarChangeModalOpen && (
        <AvatarSelectionModal
          isOpen={isAvatarChangeModalOpen}
          onClose={() => setIsAvatarChangeModalOpen(false)}
          onAvatarChange={onAvatarChange}
          error={error}
        />
      )}
    </div>
  );
};
