import { InviteLinkPreview } from "@/features/inviteToChat/ui/inviteLinkPreview";
import { MediaGrid } from "@/shared/ui/mediaGrid/mediaGrid";

import { MessageBlock } from "../model/messageBlock/types";
import { SendingStatus } from "../model/types/serverTypes";
import { MessageForwarded } from "./messageForwarded";
import { MessageReply } from "./messageReply";
import { MessageText } from "./messageText";

export const MessageBlockRenderer = ({
  block,
  isMine,
  time,
  status,
  id,
  hasNameAbove, // 1. Принимаем проп
}: {
  block: MessageBlock;
  isMine: boolean;
  time: string;
  status: SendingStatus;
  id: number;
  hasNameAbove?: boolean; // 2. Добавляем в определение типа
}) => {
  switch (block.type) {
    case "reply":
      return <MessageReply isMine={isMine} message={block} />;

    case "forwarded":
      return <MessageForwarded message={block} />;

    case "media":
      return (
        <MediaGrid
          items={block.items.map((file) => ({ id: file.id, type: file.type, src: file.src }))}
          id={id}
          isAbleToOpen
        />
      );
    case "file":
      return null;

    case "inviteLink":
      return <InviteLinkPreview chatKey={block.chatKey} token={block.token} />;

    case "text":
      return (
        <MessageText
          block={block}
          isMine={isMine}
          time={time}
          status={status}
          hasNameAbove={hasNameAbove} // Прокидываем в MessageText
        />
      );

    default:
      return null;
  }
};
