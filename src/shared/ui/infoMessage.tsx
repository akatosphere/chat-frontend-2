import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";

type InfoMessageProps = {
  className?: string;
  imgSrc: string;
  title: string;
  description?: string;
};

export const InfoMessage: React.FC<InfoMessageProps> = ({
  className,
  imgSrc,
  title,
  description,
}) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <Image
        src={imgSrc}
        width={200}
        height={200}
        alt={title}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="desktop:mt-6 subtext desktop:text desktop:font-normal text-gray mt-4 font-medium">
        {title}
      </h2>
      {description && (
        <p className="desktop:mt-2 subtext text-gray mt-3 max-w-[320px]">{description}</p>
      )}
    </div>
  );
};
