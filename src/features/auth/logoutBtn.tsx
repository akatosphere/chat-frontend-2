"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/shared/api/logout";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type LogoutBtnProps = {
  className?: string;
};

export const LogoutBtn: React.FC<LogoutBtnProps> = ({ className }) => {
  const router = useRouter();

  const handleClick = async () => {
    await logout();
    router.push("/auth");
  };

  return (
    <Button variant="default" size="md" className={cn("", className)} onClick={handleClick}>
      Выйти
    </Button>
  );
};
