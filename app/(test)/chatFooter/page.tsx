"use client";

import { ChatFooter } from "@/widgets/chat/chatFooter/ui/chatFooter";

export default function Page() {
  return (
    <div className="desktop:w-[800px] flex min-h-svh flex-col bg-black">
      <main className="flex-1 overflow-y-auto"></main>

      <ChatFooter
        onSendMessage={(v) => {
          console.log("Сообщение:", v);
        }}
      />
    </div>
  );
}
