import { useChatListStore } from "../model/useChatListStore";

export const optimisticSendMessage = ({
  chatKey,
  message,
}: {
  chatKey: string;
  message: {
    id: number;
    uid: string;
    content: string;
    created_at: number;
    from_user_id: string;
  };
}) => {
  useChatListStore.getState().patchChat(chatKey, {
    lastMessage: {
      id: message.id,
      uid: message.uid,
      content: message.content,
      created_at: message.created_at,
      updated_at: message.created_at,
      new: true,
      from_user: message.from_user_id,
    },
    lastActivityAt: message.created_at,
    unreadMessages: 0,
  });
};
