import { cn } from "@/shared/shadcn/lib/utils";

type DateBadgeProps = {
  className?: string;
  label: string;
};

export const DateBadge: React.FC<DateBadgeProps> = ({ label, className }) => {
  return (
    <div
      className={cn(
        "flex justify-center px-2 py-0.5 bg-[#615AA399] text-white caption font-medium rounded-md w-fit self-center",
        className
      )}
    >
      <span>{label}</span>
    </div>
  );
};
