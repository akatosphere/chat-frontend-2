"use client";

import { useState } from "react";

import { CreateChatBtn } from "@/features/createChat/ui/createChatBtn";
import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { ChatListContainer } from "./chatListContainer";

type ChatsListPanelProps = {
  className?: string;
};

export const ChatsListPanel: React.FC<ChatsListPanelProps> = ({ className }) => {
  const [search, setSearch] = useState("");
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex flex-row gap-4 p-4 pr-6">
        <Searchbar onChange={setSearch} value={search} className="flex-1" />
        <CreateChatBtn />
      </div>
      <div className="list-scrollbar desktop:px-2 flex flex-1 flex-col overflow-y-auto px-4">
        <ChatListContainer search={search} />
      </div>
    </div>
  );
};
