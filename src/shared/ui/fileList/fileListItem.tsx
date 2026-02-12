import Trash from "@icons/sendFiles/trash.svg";

import { PendingFile } from "@/features/chat/chat/model/store/useChatSendFilesStore";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { FilePreview } from "./filePreview";

type FileListItemProps = {
  className?: string;
  file: PendingFile;
  onRemove: () => void;
};

export const FileListItem: React.FC<FileListItemProps> = ({ className, file, onRemove }) => {
  return (
    <div className={cn("flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5", className)}>
      <FilePreview file={file} />
      <Button
        variant="text"
        size="icon"
        onClick={onRemove}
        className="hover:bg-primary-hover ml-auto rounded-md transition-colors duration-200"
      >
        <Trash className="text-gray h-4 w-4" />
      </Button>
    </div>
  );
};
