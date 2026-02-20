import React, { memo } from "react";

import { getMessageMarginTop } from "../lib/getMessageMarginTop";
import { MappedChatMessage } from "../model/types/mappedTypes";
import { DateBadge } from "./dateBage";
import { MessageBubble } from "./messageBubble";

type MessageGroupProps = {
  label: string;
  messages: MappedChatMessage[];
  currentUserId: string;
  passDataAttributes?: boolean;
  isGroup?: boolean;
};

const messageGroupBase: React.FC<MessageGroupProps> = ({
  label,
  messages,
  currentUserId,
  isGroup = false,
  passDataAttributes = false,
}) => {
  return (
    <div className="flex flex-col">
      <DateBadge label={label} className="desktop:mb-5 mb-3" />
      {messages.map((msg, idx) => {
        const prev = messages[idx - 1];
        const next = messages[idx + 1];

        // границы группы сообщений одного автора
        const isFirstInGroup = isGroup && msg.fromUser.uid !== prev?.fromUser.uid;
        const isLastInGroup = isGroup && msg.fromUser.uid !== next?.fromUser.uid;

        const marginTop = getMessageMarginTop(msg, prev);

        return (
          <div key={msg.uid} className={marginTop}>
            <MessageBubble
              chatMessage={msg}
              currentUserId={currentUserId}
              isFirstInGroup={isFirstInGroup}
              isLastInGroup={isLastInGroup}
              {...(passDataAttributes && {
                "data-message-uid": msg.uid,
                "data-chat-key": msg.chatKey,
                "data-is-from-current-user": String(msg.fromUser.uid === currentUserId),
                "data-is-new": String(msg.isNew),
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export const MessageGroup = memo(messageGroupBase);

export default MessageGroup;
