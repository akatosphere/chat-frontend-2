import { resizeTextarea } from "@/shared/form/lib/resizeTextarea";
import { cn } from "@/shared/shadcn/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/shared/shadcn/ui/input-group";

type NameDescriptionFieldsProps = {
  className?: string;
};

export const NameDescriptionFields: React.FC<NameDescriptionFieldsProps> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <InputGroup className="group border-muted relative flex h-min w-full rounded-t-lg rounded-b-none border-b bg-white">
        <div className="reletive desktop:max-h-[129px] flex max-h-[102px] w-full flex-1 overflow-hidden">
          <InputGroupTextarea
            name="groupName"
            placeholder=" "
            className="subtext z-10 h-14 min-h-14 resize-none overflow-hidden p-0 pt-6 pl-3"
            onInput={resizeTextarea}
          />
        </div>
        <InputGroupAddon
          align="absolute"
          className="smooth top-1/2 w-full -translate-y-1/2 transform justify-between p-0 px-3 py-2 font-normal group-focus-within:top-0 group-focus-within:left-0 group-focus-within:translate-y-0 group-[&:has(textarea:not(:placeholder-shown))]:top-0 group-[&:has(textarea:not(:placeholder-shown))]:left-0 group-[&:has(textarea:not(:placeholder-shown))]:translate-y-0"
        >
          <InputGroupText className="text-gray subtext group-focus-within:caption group-[&:has(textarea:not(:placeholder-shown))]:caption smooth">
            Название*
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon
          align="absolute"
          className="smooth top-0 right-0 justify-between p-0 px-3 py-2 font-normal opacity-0 group-focus-within:opacity-100"
        >
          <InputGroupText className="text-gray caption smooth">0/100</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="group relative flex h-min w-full rounded-t-none rounded-b-lg bg-white">
        <div className="reletive desktop:max-h-[129px] flex max-h-[102px] w-full flex-1 overflow-hidden">
          <InputGroupTextarea
            name="groupName"
            placeholder=" "
            className="subtext z-10 h-14 min-h-14 resize-none overflow-hidden p-0 pt-6 pl-3"
            onInput={resizeTextarea}
          />
        </div>
        <InputGroupAddon
          align="absolute"
          className="top-1/2 -translate-y-1/2 transform p-0 py-2 pl-3 transition-all duration-100 ease-out group-focus-within:top-0 group-focus-within:left-0 group-focus-within:translate-y-0 group-[&:has(textarea:not(:placeholder-shown))]:top-0 group-[&:has(textarea:not(:placeholder-shown))]:left-0 group-[&:has(textarea:not(:placeholder-shown))]:translate-y-0"
        >
          <InputGroupText className="subtext text-gray group-focus-within:caption group-[&:has(textarea:not(:placeholder-shown))]:caption font-normal transition-all duration-100 ease-out">
            Описание
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon
          align="absolute"
          className="smooth top-0 right-0 justify-between p-0 px-3 py-2 font-normal opacity-0 group-focus-within:opacity-100"
        >
          <InputGroupText className="text-gray caption smooth">0/100</InputGroupText>
        </InputGroupAddon>
        {/* делаю красивый ресайз полей*/}
      </InputGroup>
    </div>
  );
};
