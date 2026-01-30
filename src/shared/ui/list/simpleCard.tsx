import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

export type SimpleCardProps = {
  className?: string;
  children: ReactNode;
  isLast?: boolean;
  showDivider?: boolean;
  onClick?: () => void;
  href?: string;
};

export const SimpleCard = (props: SimpleCardProps) => {
  const { className, children, isLast = false, showDivider = true, onClick, href } = props;

  const content = <div className={cn("flex w-full gap-3 px-3 py-3", className)}>{children}</div>;

  const wrapperClasses = cn(
    "w-full rounded-md transition-all",
    !isLast && showDivider && "border-b border-gray-100",
    "hover:bg-primary-hover smooth",
  );

  return (
    <div className={wrapperClasses}>
      <Button
        asChild
        variant="ghost"
        size="icon-auto"
        onClick={onClick}
        className="h-full w-full justify-between font-normal"
      >
        {!onClick && href ? (
          <Link href={href}>{content}</Link>
        ) : (
          <div className="cursor-pointer">{content}</div>
        )}
      </Button>
    </div>
  );
};
