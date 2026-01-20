import { ContactsSearch } from "@/features/contacts/ui/contactsSearch";
import { Button } from "@/shared/shadcn/ui/button";

type Step2WidgetProps = {
  className?: string;
};

export const Step2Widget: React.FC<Step2WidgetProps> = () => {
  return (
    <div className="flex h-full flex-col justify-between px-2">
      <ContactsSearch />
      <Button className="w-full" variant="default" size="md">
        Создать
      </Button>
    </div>
  );
};
