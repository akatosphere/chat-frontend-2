"use client";

import { getSocket } from "@/shared/api/wsClient";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type WsDisconnectBtnProps = {
  className?: string;
};

export const WsDisconnectBtn: React.FC<WsDisconnectBtnProps> = ({ className }) => {
  const wsDisconnect = () => {
    const socket = getSocket();
    socket?.close();
  };
  return (
    <Button className={cn("", className)} size="md" onClick={wsDisconnect}>
      Разорвать сокет
    </Button>
  );
};
