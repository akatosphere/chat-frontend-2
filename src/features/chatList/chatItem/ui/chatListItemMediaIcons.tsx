import Photo from "@icons/chat/picture.svg";
import Video from "@icons/chat/video.svg";
import { ComponentType, SVGProps } from "react";

import { PreviewIconType } from "../model/types";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<PreviewIconType, SvgIcon> = {
  photo: Photo,
  video: Video,
  file: Photo,
};

type ChatListItemMediaIconsProps = {
  icons: PreviewIconType[];
};

export const ChatListItemMediaIcons: React.FC<ChatListItemMediaIconsProps> = ({ icons }) => {
  return (
    <>
      {icons.map((type, index) => {
        const ICON = ICON_MAP[type];
        return <ICON key={`${type}-${index}`} className="h-3.5 w-3.5 shrink-0" />;
      })}
    </>
  );
};
