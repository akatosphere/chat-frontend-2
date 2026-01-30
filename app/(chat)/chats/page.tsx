import { ChatsListPanel } from "@/features/chatList/ui/chatsListPanel";

export default function ChatsPage() {
  return (
    <>
      <ChatsListPanel className="desktop:hidden flex h-full min-h-0 flex-col" />
      <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
        Выберите контакт для начала общения
      </div>
    </>
  );
}
