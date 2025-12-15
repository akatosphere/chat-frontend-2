import { getLastMessagePreview } from "./getLastMessagePreview";
import { ChatItemData } from "../model/types";
import Forwarded from "@icons/chat/forwardedd.svg";
import { cn } from "@/shared/shadcn/lib/utils";

type MessagePreviewProps = {
  lastMsg: ChatItemData["last_message"];
  isActive?: boolean;
};

export const MessagePreview = ({ lastMsg, isActive }: MessagePreviewProps) => {
  const { icons: messageIcons, text: messageText } = getLastMessagePreview({
    content: lastMsg?.content,
    files: lastMsg?.files_summary || null,
  });

  return (
    <div className="minitext text-text-gray line-clamp-2 flex items-start min-w-0">
      {lastMsg?.has_replied_message && (
        <Forwarded
          className={cn(
            "shrink-0 text-gray mt-[2px] mr-1.5 w-3.5 h-3 transition-colors duration-200",
            isActive && "text-white"
          )}
        />
      )}
      {!lastMsg?.has_replied_message && lastMsg?.has_forwarded_message && (
        <Forwarded
          className={cn(
            "shrink-0 text-gray mt-[2px] mr-1.5 w-3.5 h-3 transition-colors duration-200",
            isActive && "text-white"
          )}
        />
      )}
      {messageIcons.length !== 0 && (
        <div className="flex gap-0.5 items-center w-fit min-w-fit mr-1">
          {messageIcons.map((icon, i: number) => (
            <span key={i} className="shrink-0">
              {icon}
            </span>
          ))}
        </div>
      )}
      <p
        className={`line-clamp-2 wrap-break-words minitext-tight text-gray transition-colors duration-200 ${
          isActive ? "text-white" : ""
        }`}
      >
        {messageText}
      </p>
    </div>
  );
};
