"use client";
import { getSocket } from "@/shared/api/wsClient";
import { Button } from "@/shared/shadcn/ui/button";
import { MainContent } from "@/shared/ui/mainContent";
import { Sidebar } from "@/shared/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const wsDisconnect = () => {
    const socket = getSocket();
    socket?.close();
  };
  return (
    <>
      <Sidebar className="desktop:flex desktop:bg-main-light-gray bg-white">{children}</Sidebar>

      <MainContent className="desktop:flex hidden">
        <Button className="m-3 w-50" size="md" onClick={wsDisconnect}>
          Разорвать сокет
        </Button>
      </MainContent>
    </>
  );
}
