import { useState } from "react";
import { Message, User } from "../model/types";
import { sendMessageMock } from "../lib/sendMessage";

type Props = {
  currentUser: User;
  onSend: (message: Message) => void;
};

export const SendMessageForm = ({ currentUser, onSend }: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const message = await sendMessageMock(text, currentUser);
    onSend(message);
    setText("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded px-3 py-2 border"
        placeholder="Написать сообщение..."
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-light-green px-4 py-2 rounded text-white"
      >
        {loading ? "..." : "Отправить"}
      </button>
    </form>
  );
};
