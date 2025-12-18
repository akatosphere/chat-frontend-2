import { cn } from "@/shared/shadcn/lib/utils";

type DateBadgeProps = {
  label: string;
};

export const DateBadge: React.FC<DateBadgeProps> = ({ label }) => {
  return (
    <div className="my-6 flex justify-center">
      <span className="bg-tone-gray/70 px-4 py-1.5 rounded-full text-xs font-medium text-gray">
        {label}
      </span>
    </div>
  );
};
