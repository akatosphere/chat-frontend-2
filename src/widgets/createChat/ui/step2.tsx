import { useCreateChatStore } from "@/features/createChat/model/store";
import { Searchbar } from "@/shared/ui/searchbar";

type Step2WidgetProps = {
  className?: string;
};

export const Step2Widget: React.FC<Step2WidgetProps> = () => {
  const { formData } = useCreateChatStore();
  console.log(formData);

  return <Searchbar />;
};
