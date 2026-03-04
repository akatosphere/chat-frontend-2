"use client";
import { useIsMobileStore } from "@/shared/model/isMobile.store";

import { MediaViewer } from "./mediaViewer";
import { MediaViewerMobile } from "./mediaViewerMobile";

type MediaViewerContainerProps = {
  className?: string;
};

export const MediaViewerContainer: React.FC<MediaViewerContainerProps> = () => {
  const isMobile = useIsMobileStore((s) => s.isMobile);
  return isMobile ? <MediaViewerMobile /> : <MediaViewer />;
};
