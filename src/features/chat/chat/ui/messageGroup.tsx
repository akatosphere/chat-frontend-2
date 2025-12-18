import { getMessageMarginTop } from "../lib/getMessageMarginTop";
import { MessageGroupType } from "../model/types";
import { DateBadge } from "./dateBage";
import { MessageBubble } from "./messageBubble";

type MessageGroupProps = {
  className?: string;
  group: MessageGroupType;
};

export const MessageGroup = ({ group }: MessageGroupProps) => {
  return (
    <div className="flex flex-col">
      <DateBadge label={group.label} className="mb-3 desktop:mb-5" />

      {group.messages.map((message, index) => {
        const prev = index > 0 ? group.messages[index - 1] : undefined;
        const mtClass = getMessageMarginTop(message, prev);

        return (
          <div key={message.id} className={mtClass}>
            <MessageBubble chatMessage={message} />
          </div>
        );
      })}
    </div>
  );
};
