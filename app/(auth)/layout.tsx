import { Background } from "@/shared/background/ui/Background";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Background>
      <div className="gap-2 absolute top-4 left-4 hidden md:flex w-[400px] flex-wrap">
        <Link href="/start">Стартовая</Link>
        <Link href="/phone">Телефон</Link>
        <Link href="/code">Код</Link>
        <Link href="/user">Фамилия/имя</Link>
        <Link href="/support">Поддержка</Link>
        <Link href="/support/success">Поддержка - успех</Link>
        <Link href="/success">Успешная регистрация</Link>
      </div>
      {children}
    </Background>
  );
}
