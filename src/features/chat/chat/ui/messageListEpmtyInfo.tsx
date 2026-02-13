import { InfoMessage } from "@/shared/ui/infoMessage";

import { ChatType } from "../model/types/serverTypes";

type MessageListEmptyInfoProps = {
  type: ChatType | null;
  isOwner: boolean;
};

export const MessageListEmptyInfo: React.FC<MessageListEmptyInfoProps> = ({ type, isOwner }) => {
  return (
    <>
      {(type === "private-channel" || type === "public-channel") && isOwner && (
        <InfoMessage
          imgSrc="/info/chanelCreated.svg"
          title="Вы создали канал"
          description="Добавьте публикацию"
          className="flex-1 justify-center"
        />
      )}
      {(type === "private-group" || type === "public-group") && isOwner && (
        <InfoMessage
          imgSrc="/info/groupCreated.svg"
          title="Вы создали группу"
          className="flex-1 justify-center"
        />
      )}
      {(type === "chat" || (type === "public-group" && !isOwner)) && (
        <InfoMessage
          imgSrc="/info/messagesNotFound.svg"
          title="Сообщений пока нет"
          description="Напишите первым :)"
          className="flex-1 justify-center"
        />
      )}
      {type === "public-channel" && !isOwner && (
        <InfoMessage
          imgSrc="/info/messagesNotFound.svg"
          title="Публикаций пока нет"
          description="Подпишитесь и ждите публикаций"
          className="flex-1 justify-center"
        />
      )}
    </>
  );
};
