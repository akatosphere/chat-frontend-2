"use client";

import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

import { getSocket } from "../api/ws/wsClient";

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
