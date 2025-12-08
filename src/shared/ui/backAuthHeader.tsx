import { cn } from "@/shared/shadcn/lib/utils";
import { BackButton } from "./backButton";
import { Logo } from "./logo";

type BackAuthHeaderProps = {
  className?: string;
  backHref: string;
};

export const BackAuthHeader: React.FC<BackAuthHeaderProps> = ({
  className,
  backHref,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between desktop:hidden desktop:mb-0",
        className
      )}
    >
      <BackButton href={backHref} />
      <Logo size="sm" />
    </div>
  );
};
