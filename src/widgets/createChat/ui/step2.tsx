import { ContactsSearch } from "@/features/contacts/ui/contactsSearch";
import { SubmitCreateChatBtn } from "@/features/createChat/ui/submitCreateChatBtn";

type Step2WidgetProps = {
  className?: string;
};

export const Step2Widget: React.FC<Step2WidgetProps> = () => {
  return (
    <div className="flex h-full flex-col justify-between px-2">
      <ContactsSearch />
      <SubmitCreateChatBtn />
    </div>
  );
};
