"use client";

import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "@/shared/api/getApiClient";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";

type QueryBtnProps = {
  className?: string;
};

export const QueryBtn: React.FC<QueryBtnProps> = ({ className }) => {
  const getChatList = async () => {
    const { data } = await getApiClient.get("/api/v1/chat/list/");
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
