import { X } from "lucide-react";

import { Button } from "@/shared/shadcn/ui/button";

type Props = {
  label: string;
  danger?: boolean;
};

export const SingleActionBar = ({ label, danger }: Props) => {
  return (
    <div className="border-primary md:bg-nav-bg-active relative mx-4 mt-4 mb-2 flex h-11 items-center justify-center rounded-2xl border-2 bg-white md:m-0 md:mx-0 md:rounded-none md:border-none">
      <Button variant="ghost" className={danger ? "text-red-500" : "text-primary"}>
        {label}
      </Button>

      <Button variant="ghost" size="icon" className="absolute right-4 h-11 w-11">
        <X className="h-6 w-6 text-gray-400" />
      </Button>
    </div>
  );
};
