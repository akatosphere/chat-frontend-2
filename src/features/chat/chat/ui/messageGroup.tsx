import React from "react";

import { getMessageMarginTop } from "../lib/getMessageMarginTop";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { DateBadge } from "./dateBage";
import { MessageBubble } from "./messageBubble";

type MessageGroupProps = {
  label: string;
  messages: MappedChatMessage[];
  currentUserId: string;
  passDataAttributes?: boolean;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const MessageGroupComponent: React.FC<MessageGroupProps> = ({
  label,
  messages,
  currentUserId,
  passDataAttributes = false,
}) => {
  return (
    <div className="flex w-full flex-col">
      <DateBadge label={label} className="desktop:mb-5 mb-3" />
      {messages.map((msg, idx) => {
        const prev = messages[idx - 1];
        const marginTop = getMessageMarginTop(msg, prev);

        return (
          <MessageBubble
            key={msg.uid}
            className={marginTop}
            chatMessage={msg}
            currentUserId={currentUserId}
            {...(passDataAttributes && {
              "data-message-uid": msg.uid,
              "data-chat-key": msg.chatKey,
              "data-is-from-current-user": String(msg.fromUser.uid === currentUserId),
              "data-is-new": String(msg.isNew),
            })}
          />
        );
      })}
    </div>
  );
};

export const MessageGroup = React.memo(MessageGroupComponent);

export default MessageGroup;
