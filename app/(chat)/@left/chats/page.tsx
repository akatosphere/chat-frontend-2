import { ChatsListPanel } from "@/features/chatList/ui/chatsListPanel";
import { Sidebar } from "@/shared/ui/sidebar";

export default function ChatsLeft() {
  return (
    <Sidebar>
      <ChatsListPanel />
    </Sidebar>
  );
}
