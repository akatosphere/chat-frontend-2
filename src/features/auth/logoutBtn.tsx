import { useAuthStore } from "@/shared/api/store";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type LogoutBtnProps = {
  className?: string;
};

export const LogoutBtn: React.FC<LogoutBtnProps> = ({ className }) => {
  const logout = useAuthStore((s) => s.logout);
  return (
    <Button className={cn("", className)} onClick={logout}>
      Выйти
    </Button>
  );
};
