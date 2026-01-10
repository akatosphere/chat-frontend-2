import Image from "next/image";

import { cn } from "../shadcn/lib/utils";

type SupportSuccessProps = {
  className?: string;
};

export const SupportSuccess: React.FC<SupportSuccessProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Image
        src="/auth/supportSuccess.svg"
        alt="Успех"
        width={66}
        height={66}
        className="mx-auto mb-4 object-contain"
      />
      <span className="title mb-7 text-center font-medium text-black">Обращение отправлено!</span>
      <p className="text mb-6 text-center text-black">
        В ближайшее время вы получите ответ на электронную почту, указанную в обращении
      </p>
    </div>
  );
};
