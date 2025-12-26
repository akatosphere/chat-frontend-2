import { ChatsListPanel } from "@/features/chatList/ui/chatsListPanel";

export default function ChatsPage() {
  return (
    <>
      <ChatsListPanel className="desktop:hidden" />
      <span className="desktop:flex text text-gray hidden h-full items-center justify-center">
        Выберите контакт для начала общения
      </span>
    </>
  );
}
