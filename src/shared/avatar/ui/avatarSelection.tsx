"use client";

import Plus from "@icons/plus.svg";

import { Avatar } from "@/entities/chat/ui/avatar";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { AvatarSelectionModal } from "./avatarSelectionModal";
import { containerVariants, plusIconVariants, triggerButtonVariants } from "./avatarVariants";

type AvatarSectionProps = {
  avatarUrl: string;
  isAvatarChangeModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onAvatarDelete: () => void;
  onAvatarChange: (file: File) => void;
  avatarVariant?: "user" | "chat";
};

export const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatarUrl,
  isAvatarChangeModalOpen,
  setIsModalOpen,
  onAvatarChange,
  onAvatarDelete,
  avatarVariant = "user",
}) => {
  return (
    <div className={cn(containerVariants({ variant: avatarVariant }))}>
      <Avatar
        size={avatarVariant == "user" ? "settingsAvatar" : "createGroupAvatar"}
        className="flex w-full justify-center"
        avatarUrl={avatarUrl}
        variant={avatarVariant}
      />
      <Button
        type="button"
        variant="text"
        size="inline"
        className={cn(triggerButtonVariants({ variant: avatarVariant }))}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center">
          <Plus className={cn(plusIconVariants({ variant: avatarVariant }))} />
          <span className="leading-none">Изменить фото</span>
        </div>
      </Button>

      {isAvatarChangeModalOpen && (
        <AvatarSelectionModal
          isOpen={isAvatarChangeModalOpen}
          onAvatarDelete={onAvatarDelete}
          avatarUrl={avatarUrl}
          onClose={() => setIsModalOpen(false)}
          onAvatarChange={onAvatarChange}
        />
      )}
    </div>
  );
};
