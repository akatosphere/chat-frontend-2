import { InfoMessage } from "./infoMessage";

type ContactsListEmptyProps = {
  className?: string;
};

export const ContactsListEmpty: React.FC<ContactsListEmptyProps> = () => {
  return <InfoMessage imgSrc="/info/contactsListEmpty.svg" title="Список контактов пока пуст" />;
};
