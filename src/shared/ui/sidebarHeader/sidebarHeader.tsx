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
    <div className={cn("border-muted h-14 w-full border-b p-5", className)}>
      {!backButton && <h2 className="text text-center font-semibold">{title}</h2>}
      {backButton && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="group-hover:text-primary group flex h-6 w-6 cursor-pointer items-center"
          >
            <BackArrow className="text-black" />
          </button>
          <h2 className="text font-semibold">{title}</h2>
        </div>
      )}
    </div>
  );
};
