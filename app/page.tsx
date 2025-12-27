import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 bg-white px-16 py-32 sm:items-start">
        <Link href="auth">Авторизация</Link>
        <Link href="chats">Чаты</Link>
        <Link href="chatHeader">Хедер чата</Link>
      </main>
    </div>
  );
}
