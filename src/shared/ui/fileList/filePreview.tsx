import Image from "next/image";

import { formatFileSize } from "@/features/chat/chat/lib/formatFileSize";
import { PendingFile } from "@/features/chat/chat/model/store/useChatSendFilesStore";
import { cn } from "@/shared/shadcn/lib/utils";
import Audio from "@/shared/ui/icons/files/audioPreview.svg";
import File from "@/shared/ui/icons/files/filePreview.svg";

type FilePreviewProps = {
  className?: string;
  file: PendingFile;
};

export const FilePreview: React.FC<FilePreviewProps> = ({ className, file }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full">
        {file.type === "document" && <File className="h-full w-full" />}
        {(file.type === "image" || file.type === "video") && (
          <Image
            src={file.previewUrl || "imageLoader.svg"}
            alt={file.title || file.file.name}
            width={48}
            height={48}
            className="h-full w-full rounded-md bg-white object-cover"
          />
        )}
        {file.type === "audio" && <Audio className="h-full w-full" />}
      </div>
      <div className="flex max-w-[136px] flex-col sm:max-w-[280px] lg:max-w-[260px]">
        <span className="subtext mb-1 truncate text-black">{file.title}</span>
        <span className="text-gray minitext">{formatFileSize(file.file.size)}</span>
      </div>
    </div>
  );
};
