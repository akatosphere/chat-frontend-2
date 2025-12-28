import { logout } from "@/shared/api/logout";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type LogoutBtnProps = {
  className?: string;
};

export const LogoutBtn: React.FC<LogoutBtnProps> = ({ className }) => {
  return (
    <Button className={cn("", className)} onClick={logout}>
      Выйти
    </Button>
  );
};
