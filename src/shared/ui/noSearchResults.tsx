import { InfoMessage } from "./infoMessage";

type NoSearchResultsProps = {
  className?: string;
};

export const NoSearchResults: React.FC<NoSearchResultsProps> = () => {
  return (
    <InfoMessage
      imgSrc="/info/chatNotFound.svg"
      title="Поиск не дал результатов"
      description="По вашему запросу ничего не найдено. Измените запрос и попробуйте снова"
    />
  );
};
