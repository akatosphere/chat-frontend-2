import { Background } from "@/shared/background/ui/Background";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Background>
      <div className="flex gap-2 absolute top-4 left-4">
        <Link href="/start">Стартовая</Link>
        <Link href="/phone">Поддержка</Link>
        <Link href="/code">Код</Link>
        <Link href="/info">Фамилия/имя</Link>
        <Link href="/support">Поддержка</Link>
      </div>
      {children}
    </Background>
  );
}
