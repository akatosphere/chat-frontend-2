"use client";

import { useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import { Searchbar } from "@/shared/ui/searchbar";

import { ChatListContainer } from "./chatListContainer";

type ChatsListPanelProps = {
  className?: string;
};

export const ChatsListPanel: React.FC<ChatsListPanelProps> = ({ className }) => {
  const [search, setSearch] = useState("");

  return (
    <div className={cn("flex h-full flex-col overflow-y-auto", className)}>
      <Searchbar onChange={setSearch} value={search} className="p-4" />
      <ChatListContainer search={search} />
    </div>
  );
};
