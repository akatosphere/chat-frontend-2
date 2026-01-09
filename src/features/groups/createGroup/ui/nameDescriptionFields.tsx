import { resizeTextarea } from "@/shared/form/lib/resizeTextarea";
import { cn } from "@/shared/shadcn/lib/utils";
import { InputGroup, InputGroupTextarea } from "@/shared/shadcn/ui/input-group";

type NameDescriptionFieldsProps = {
  className?: string;
};

export const NameDescriptionFields: React.FC<NameDescriptionFieldsProps> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <InputGroup className="relative flex h-min w-full rounded-lg bg-white">
        <div className="reletive desktop:max-h-[129px] flex max-h-[102px] flex-1 overflow-hidden rounded-3xl">
          <InputGroupTextarea
            name="groupName"
            className="subtext h-14 min-h-11 resize-none overflow-hidden py-4"
            onInput={resizeTextarea}
            placeholder="Название*"
          />
        </div>
      </InputGroup>
    </div>
  );
};
