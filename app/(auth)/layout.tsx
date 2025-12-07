import { Background } from "@/shared/background/ui/Background";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Background>
      <div className="gap-2 absolute top-4 left-4 hidden md:flex">
        <Link href="/start">Стартовая</Link>
        <Link href="/phone">Телефон</Link>
        <Link href="/code">Код</Link>
        <Link href="/user">Фамилия/имя</Link>
        <Link href="/support">Поддержка</Link>
      </div>
      {children}
    </Background>
  );
}
