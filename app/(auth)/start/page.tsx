import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { Logo } from "@/shared/ui/logo";
import { Modal } from "@/shared/ui/modal";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundCardLayout>
      <Logo size="lg" withTitle className="mb-6" />
      <div className="flex flex-col gap-2 text-primary-dark text-center">
        <span className="text">Привет!</span>
        <span className="text">Давай знакомиться!</span>
      </div>
      <Button className="mt-auto" variant={"default"} size={"lg"} asChild>
        <Link href="/phone">Начать</Link>
      </Button>
    </BackgroundCardLayout>
  );
}
