import Photo from "@icons/chat/picture.svg";
import Video from "@icons/chat/video.svg";
import { PreviewIconType } from "../model/types";
import { ComponentType, SVGProps } from "react";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<PreviewIconType, SvgIcon> = {
  photo: Photo,
  video: Video,
  file: Photo,
};

type ChatListItemMediaIconsProps = {
  className?: string;
  icons: PreviewIconType[];
};

export const ChatListItemMediaIcons: React.FC<ChatListItemMediaIconsProps> = ({
  className,
  icons,
}) => {
  return (
    <>
      {icons.map((type, index) => {
        const Icon = ICON_MAP[type];
        return (
          <Icon key={`${type}-${index}`} className="w-3.5 h-3.5 shrink-0" />
        );
      })}
    </>
  );
};
