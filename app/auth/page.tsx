import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { Logo } from "@/shared/ui/logo";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundCardLayout>
      <Logo size="lg" withTitle className="mb-4 desktop:mb-6" />
      <div className="flex flex-col gap-1 desktop:gap-0.5 text-primary-dark text-center">
        <span className="text">Привет!</span>
        <span className="text">Давай знакомиться!</span>
      </div>
      <Button
        className="mt-6 desktop:mt-auto max-w-[326px] desktop:max-w-full w-full mx-auto"
        variant={"default"}
        size={"lg"}
        asChild
      >
        <Link href="/auth/phone">Начать</Link>
      </Button>
    </BackgroundCardLayout>
  );
}
