import Image from "next/image";
import Link from "next/link";
import React from "react";

import { SITE_TITLE } from "../lib/constants/siteInfo";
import { cn } from "../shadcn/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "lg";
  href?: string;
  withTitle?: boolean;
}

const logoVariants = {
  logo_sizes: {
    sm: "w-[58px] h-[53px] lg:w-[78px] lg:h-[70px]",
    lg: "w-[211px] h-[183px] lg:w-[179px] lg:h-[161px]",
  },
  title_sizes: {
    sm: "text-[32px] mt-[8px] lg:hidden lg:mt-0",
    lg: "text-[34px] mt-[40px] lg:mt-[64px] lg:text-[32px]",
  },
};

export const Logo: React.FC<Props> = ({
  className,
  size = "sm",
  href = "/",
  withTitle = false,
}) => {
  console.log(withTitle);
  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <Link href={href} className={cn("inline-block", logoVariants.logo_sizes[size])}>
        <div className="relative h-full w-full">
          <Image src="/logo.svg" alt="Логотип А-Чат" priority fill className="object-contain" />
        </div>
      </Link>
      {withTitle && (
        <h3
          className={cn(
            "text-center leading-tight font-bold text-black",
            logoVariants.title_sizes[size],
          )}
        >
          {SITE_TITLE}
        </h3>
      )}
    </div>
  );
};
