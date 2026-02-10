import { X } from "lucide-react";

import { Button } from "@/shared/shadcn/ui/button";

export const ChatDialogBar = () => {
  return (
    <div className="w-min-[360px] relative mx-4 mt-4 flex flex-col md:mt-0 md:flex-row md:items-center md:justify-center">
      <div className="border-primary md:bg-nav-bg-active relative mb-2 flex h-11 items-center justify-center rounded-2xl border-2 bg-white md:mb-0 md:w-80 md:border-none">
        <div className="flex justify-center">
          <Button variant="ghost" className="text-primary">
            Добавить в контакты
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="absolute right-4 h-11 w-11 md:hidden">
          <X className="h-6 w-6 text-gray-400" />
        </Button>
      </div>

      <Button
        variant="ghost"
        className="md:bg-nav-bg-active h-11 rounded-2xl bg-white text-red-500 md:w-80"
      >
        Заблокировать
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 hidden h-11 w-11 md:flex md:justify-end"
      >
        <X className="h-6 w-6 text-gray-400" />
      </Button>
    </div>
  );
};
