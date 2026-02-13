import {
  PendingFile,
  useSendFilesStore,
} from "@/features/chat/chat/model/store/useChatSendFilesStore";
import { cn } from "@/shared/shadcn/lib/utils";

import { FileListItem } from "./fileListItem";

type FileListProps = {
  className?: string;
  files: PendingFile[];
};

export const FileList: React.FC<FileListProps> = ({ className, files }) => {
  const { remove } = useSendFilesStore();
  return (
    <div className={cn("max-h-[340px] overflow-y-auto", className)}>
      {files.map((file) => (
        <FileListItem key={file.id} file={file} onRemove={() => remove(file.id)} />
      ))}
    </div>
  );
};
