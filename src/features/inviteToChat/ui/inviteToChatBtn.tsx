"use client";
import PlusInCircle from "@icons/plusInCircle.svg";

import { Button } from "@/shared/shadcn/ui/button";

export const InviteToChatBtn: React.FC = () => {
  return (
    <Button
      variant="ghost"
      size="icon-auto"
      className="text-primary hover:text-primary-secondary smooth"
    >
      <PlusInCircle className="h-5 w-5" />
      <p className="subtext">Пригласить участников</p>
    </Button>
  );
};
