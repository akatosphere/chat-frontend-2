import { mockMessages } from "@/features/chat/chat/lib/mock";
import { MessageList } from "@/features/chat/chat/ui/messageList";

export default function Page() {
  return (
    <div>
      <MessageList messages={mockMessages} />
    </div>
  );
}
