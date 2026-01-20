"use client";

import { useEffect } from "react";

import { useCreateChatStore } from "@/features/createChat/model/store";
import { cn } from "@/shared/shadcn/lib/utils";

import { Step1Widget } from "./step1";
import { Step2Widget } from "./step2";

type CreateChatProps = {
  className?: string;
  groupOrChannel: "group" | "channel";
};

export const CreateChat: React.FC<CreateChatProps> = ({ className, groupOrChannel }) => {
  const { step, setGroupOrChannel, reset } = useCreateChatStore();

  useEffect(() => {
    setGroupOrChannel(groupOrChannel);
  }, [groupOrChannel, setGroupOrChannel]);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <section className={cn("h-full pb-4", className)}>
      {step === 1 && <Step1Widget />}
      {step === 2 && <Step2Widget />}
    </section>
  );
};
