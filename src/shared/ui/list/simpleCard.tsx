import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

export type SimpleCardProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  isLast?: boolean;
  showDivider?: boolean;
  onClick?: () => void;
};

export const SimpleCard = (props: SimpleCardProps) => {
  const { href, className, children, isLast = false, showDivider = true, onClick } = props;

  const content = <div className={cn("flex gap-3 px-3 py-3", className)}>{children}</div>;

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "block",
          !isLast &&
            showDivider &&
            "hover:bg-primary-hover smooth rounded-md border-b border-gray-100",
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        !isLast &&
          showDivider &&
          "hover:bg-primary-hover smooth rounded-md border-b border-gray-100",
      )}
    >
      <Button asChild variant="ghost" size="icon-auto" onClick={onClick}>
        {content}
      </Button>
    </div>
  );
};
