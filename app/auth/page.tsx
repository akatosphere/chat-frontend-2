import Link from "next/link";

import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout>
      <Logo size="lg" withTitle className="desktop:mb-6 mb-4" />
      <div className="desktop:gap-0.5 text-primary-dark flex flex-col gap-1 text-center">
        <span className="text">Привет!</span>
        <span className="text">Давай знакомиться!</span>
      </div>
      <Button
        className="desktop:mt-auto desktop:max-w-full mx-auto mt-6 w-full max-w-[326px]"
        variant={"default"}
        size={"lg"}
        asChild
      >
        <Link href="/auth/phone">Начать</Link>
      </Button>
    </BackgroundCardLayout>
  );
}
