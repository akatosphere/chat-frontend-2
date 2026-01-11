"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/shared/api/apiClient";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type QueryBtnProps = {
  className?: string;
};

export const QueryBtn: React.FC<QueryBtnProps> = ({ className }) => {
  const getChatList = async () => {
    const { data } = await api.get("/api/v1/chat/list/");
    console.log(data);
    return data;
  };

  const { isFetching, refetch } = useQuery({
    queryKey: ["chat-list"],
    queryFn: getChatList,
    enabled: false,
  });

  return (
    <Button size="md" className={cn(className)} onClick={() => refetch()} disabled={isFetching}>
      {isFetching ? "Загрузка..." : "Отправить запрос"}
    </Button>
  );
};
