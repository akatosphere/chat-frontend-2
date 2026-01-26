import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

export type SimpleCardProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  isLast?: boolean;
  showDivider?: boolean;
};

export const SimpleCard = (props: SimpleCardProps) => {
  const { href, className, children, isLast = false, showDivider = true } = props;

  const content = (
    <div className={cn("flex items-stretch gap-3 px-3 py-3", className)}>{children}</div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn("block", !isLast && showDivider && "border-b border-gray-100")}
      >
        {content}
      </Link>
    );
  }

  return <div className={cn(!isLast && showDivider && "border-b border-gray-100")}>{content}</div>;
};
