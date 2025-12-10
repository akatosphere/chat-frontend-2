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
        <Link href="/auth">Стартовая</Link>
        <Link href="/auth/phone">Телефон</Link>
        <Link href="/auth/code">Код</Link>
        <Link href="/auth/user">Фамилия/имя</Link>
        <Link href="/auth/support">Поддержка</Link>
        <Link href="/auth/support/success">Поддержка - успех</Link>
        <Link href="/auth/success">Успешная регистрация</Link>
      </div>
      {children}
    </Background>
  );
}
