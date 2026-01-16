"use client";
import BackArrow from "@icons/menu/back-arrow.svg";
import { useRouter } from "next/navigation";

import { cn } from "@/shared/shadcn/lib/utils";

type SidebarHeaderProps = {
  className?: string;
  title: string;
  backButton?: boolean;
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ className, title, backButton }) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "border-muted desktop:border-b relative flex h-14 w-full items-center p-5",
        className,
      )}
    >
      {backButton && (
        <button
          onClick={() => router.back()}
          className="group-hover:text-primary group relative z-10 flex h-6 w-6 cursor-pointer items-center"
        >
          <BackArrow className="text-black" />
        </button>
      )}

      <h2
        className={cn(
          "text font-semibold transition-all",
          "absolute left-1/2 w-max -translate-x-1/2",
          "desktop:static desktop:left-auto desktop:translate-x-0",
          backButton ? "desktop:ml-3" : "desktop:w-full desktop:text-center",
        )}
      >
        {title}
      </h2>
    </div>
  );
};
