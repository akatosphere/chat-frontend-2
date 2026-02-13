"use client";

import { useRouter } from "next/navigation";

import { useCreateChatStore } from "@/features/createChat/model/store";
import { SidebarContainer } from "@/shared/ui/sidebarContainer";
import { SidebarHeader } from "@/shared/ui/sidebarHeader/sidebarHeader";
import { CreateChat } from "@/widgets/createChat/ui/createChat";

export default function CreateGroupPage() {
  const router = useRouter();
  const { step, setStep } = useCreateChatStore();
  const backButtonFn = () => (step === 1 ? router.back() : setStep(1));
  return (
    <>
      <SidebarHeader
        title={step === 1 ? "Создать канал" : "Пригласить участников"}
        backButton
        backButtonFn={backButtonFn}
      />
      <SidebarContainer className="p-4">
        <CreateChat groupOrChannel="channel" />
      </SidebarContainer>
    </>
  );
}
