"use client";
import { cn } from "@/shared/shadcn/lib/utils";
import { useState } from "react";
import { sendSupportMessage } from "../api/sendSupportMessage";

type SupportProps = {
  className?: string;
};

export const Support: React.FC<SupportProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendSupportMessage({ email, text: text.trim() });

      console.log("Сообщение отправлено");

      setEmail("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={cn("bg-rose-50", className)} onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">отправить</button>
    </form>
  );
};
