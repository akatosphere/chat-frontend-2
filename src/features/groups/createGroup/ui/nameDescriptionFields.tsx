import { resizeTextarea } from "@/shared/form/lib/resizeTextarea";
import { cn } from "@/shared/shadcn/lib/utils";
import { InputGroup, InputGroupTextarea } from "@/shared/shadcn/ui/input-group";

type NameDescriptionFieldsProps = {
  className?: string;
};

export const NameDescriptionFields: React.FC<NameDescriptionFieldsProps> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <InputGroup className="border-muted relative flex h-min w-full rounded-t-lg rounded-b-none border-b bg-white">
        <div className="reletive desktop:max-h-[129px] flex max-h-[102px] flex-1 overflow-hidden">
          <InputGroupTextarea
            name="groupName"
            className="subtext h-14 min-h-14 resize-none overflow-hidden py-4.5"
            onInput={resizeTextarea}
            placeholder="Название*"
          />
        </div>
      </InputGroup>
      <InputGroup className="relative flex h-min w-full rounded-t-none rounded-b-lg bg-white">
        <div className="reletive desktop:max-h-[129px] flex max-h-[102px] flex-1 overflow-hidden">
          <InputGroupTextarea
            name="groupDescription"
            className="subtext h-14 min-h-14 resize-none overflow-hidden py-4.5"
            onInput={resizeTextarea}
            placeholder="Описание"
          />
        </div>
        {/* делаю красивый ресайз полей*/}
      </InputGroup>
    </div>
  );
};
