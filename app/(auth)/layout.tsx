import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[url(/bgStartPageDef.png)] bg-cover bg-center min-h-screen min-w-screen">
      <div className="flex gap-2">
        <Link href="/start">Стартовая</Link>
        <Link href="/phone">Поддержка</Link>
        <Link href="/code">Код</Link>
        <Link href="/info">Фамилия/имя</Link>
        <Link href="/support">Поддержка</Link>
      </div>
      {children}
    </div>
  );
}
