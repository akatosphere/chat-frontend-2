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
}: {
  block: MessageBlock;
  isMine: boolean;
  time: string;
  status: SendingStatus;
}) => {
  switch (block.type) {
    case "reply":
      return <MessageReply isMine={isMine} message={block} />;

    case "forwarded":
      return <MessageForwarded />;

    case "text":
      return <MessageText block={block} isMine={isMine} time={time} status={status} />;

    case "file":
      return <div>{block.fileName}</div>;

    default:
      return null;
  }
};
