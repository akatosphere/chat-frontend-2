import Close from "@icons/chat/close.svg";
import Copy from "@icons/chat/context-menu/copy.svg";
import Forward from "@icons/chat/forwardedd.svg";
import Trash from "@icons/sendFiles/trash.svg";

import { useModalStore } from "@/entities/modals/model/useGlobalModalStore";
import { pluralize } from "@/shared/lib/pluralize";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { useChatStore } from "../model/store/useChatStore";

type SelectBoxProps = {
  className?: string;
};

export const SelectBox: React.FC<SelectBoxProps> = ({ className }) => {
  const { selectedMessageUids, exitSelectionMode, chatKey } = useChatStore();
  const { openModal } = useModalStore();

  if (!selectedMessageUids.size) return null;

  return (
    <div
      className={cn("flex min-h-[72px] w-full items-center justify-between px-4 py-3", className)}
    >
      <div className="flex items-center gap-4">
        <Button
          variant={"text"}
          size={"inline"}
          className="text-gray h-5 w-5 shrink-0"
          onClick={exitSelectionMode}
        >
          <Close className="h-5 w-5" />
        </Button>
        <span className="text font-medium text-black">
          Выбрано {selectedMessageUids.size}{" "}
          {pluralize(selectedMessageUids.size, "сообщение", "сообщения", "сообщений")}
        </span>
      </div>

      <div className="flex gap-3">
        <Button variant={"text"} size={"inline"} className="text-gray h-9 w-9 shrink-0">
          <Forward className="h-6 w-6" />
        </Button>
        <Button variant={"text"} size={"inline"} className="text-gray h-9 w-9 shrink-0">
          <Copy className="h-6 w-6" />
        </Button>
        <Button
          variant={"text"}
          size={"inline"}
          className="text-error h-9 w-9 shrink-0"
          onClick={() => {
            openModal("deleteMessage", { messageId: "", chatKey: chatKey! });
          }}
        >
          <Trash className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
