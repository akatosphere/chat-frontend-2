import { Logo } from "@/shared/ui/logo";
import { StoreBadge } from "@/shared/ui/storeBadge";

export const AppHeader = () => {
  return (
    <header className="desktop:block mx-auto hidden h-[60px] w-full max-w-[1260px] rounded-sm bg-[#F5F6F8]">
      <div className="flex h-full items-center justify-between px-4 py-2">
        <Logo size="xs" />
        <div className="flex gap-2">
          <StoreBadge type={"apple"} />
          <StoreBadge type={"google"} />
        </div>
      </div>
    </header>
  );
};
