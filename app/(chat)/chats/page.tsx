import { ChatsListPanel } from "@/features/chatList/ui/chatsListPanel";

export default function ChatsPage() {
  return (
    <>
      <ChatsListPanel className="desktop:hidden flex h-full min-h-0 flex-col" />
      <span className="desktop:flex text text-gray hidden h-full items-center justify-center">
        Выберите контакт для начала общения
      </span>
    </>
  );
}
