import { cn } from "@/shared/shadcn/lib/utils";

type DateBadgeProps = {
  className?: string;
  label: string;
};

export const DateBadge: React.FC<DateBadgeProps> = ({ label, className }) => {
  return (
    <div
      className={cn(
        "caption flex w-fit justify-center self-center rounded-md bg-[#615AA399] px-2 py-0.5 font-medium text-white",
        className,
      )}
    >
      <span>{label}</span>
    </div>
  );
};
