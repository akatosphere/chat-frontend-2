import { useCreateChatStore } from "@/features/createChat/model/store";
import { cn } from "@/shared/shadcn/lib/utils";

type Step2WidgetProps = {
  className?: string;
};

export const Step2Widget: React.FC<Step2WidgetProps> = ({ className }) => {
  const { formData } = useCreateChatStore();
  console.log(formData);

  return <div className={cn("", className)}>второй шаг</div>;
};
