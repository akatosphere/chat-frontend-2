import { Avatar } from "@/entities/chat/ui/avatar";
import { Button } from "@/shared/shadcn/ui/button";

export const EditPhotoForm = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar
        size="settingsAvatar"
        className="flex w-full justify-center"
        avatarUrl={""}
        variant="chat"
      />
      <Button variant="text" size="inline" className="text">
        Выбрать фотографию
      </Button>
    </div>
  );
};
