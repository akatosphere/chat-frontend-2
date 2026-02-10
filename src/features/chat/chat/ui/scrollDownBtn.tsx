import ArrowDown from "@icons/chat/arrowDown.svg";

import { cn } from "@/shared/shadcn/lib/utils";
type ScrollDownBtnProps = {
  className?: string;
  onClick: () => void;
};

export const ScrollDownBtn: React.FC<ScrollDownBtnProps> = ({ className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-gray-transparent hover:bg-primary-accent-light flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-200",
        className,
      )}
    >
      <ArrowDown className="h-3 w-6" />
    </button>
  );
};
