"use client";
import { MessageList } from "@/features/chat/chat/ui/messageList";
import React, { useState } from "react";

const CURRENT_USER_UID = "user-me"; // UID текущего авторизованного пользователя
const CHAT_WITH_USER_UID = "user-other"; // UID собеседника (берётся из маршрута или стора)

export default function ChatPage() {
  const [scenario, setScenario] = useState<"all-read" | "has-unread">(
    "all-read"
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex gap-4">
        <button
          onClick={() => setScenario("all-read")}
          className={scenario === "all-read" ? "font-bold" : ""}
        >
          Все прочитаны
        </button>
        <button
          onClick={() => setScenario("has-unread")}
          className={scenario === "has-unread" ? "font-bold" : ""}
        >
          30 непрочитанных
        </button>
      </div>
      <MessageList
        currentUserUid="user-me"
        chatWithUserUid="user-other"
        scenario={scenario}
        className="flex-1"
      />
    </div>
  );
}
