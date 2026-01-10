import { cn } from "@/shared/shadcn/lib/utils";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

type AuthHeaderProps = {
  backHref?: string;
  logoSize?: "sm" | "lg";
  withTitle?: boolean;
  className?: string;
  classBackButton?: string;
};

export const AuthHeader = ({
  backHref,
  logoSize,
  withTitle,
  className,
  classBackButton,
}: AuthHeaderProps) => {
  return (
    <div className={cn("relative mb-8 flex w-full justify-center", className)}>
      {backHref && <BackButton href={backHref} className={classBackButton} />}
      <Logo size={logoSize} withTitle={withTitle} />
    </div>
  );
};
