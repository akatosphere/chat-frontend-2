import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { Logo } from "@/shared/ui/logo";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundCardLayout className="pt-[95px]" variant={"form"}>
      <Logo size="lg" className="hidden desktop:flex desktop:mb-16" />
      <Image
        src="/auth/success.svg"
        alt="Успех"
        width={154}
        height={154}
        className="mx-auto object-contain mb-5 desktop:hidden desktop:mb-0"
      />
      <div className="flex flex-col text-center mb-8">
        <span className="subheadline font-medium mb-4">Поздравляем!</span>
        <span className="text">Регистрация прошла успешно</span>
      </div>
      <Button
        className="max-w-[329px] desktop:max-w-full w-full mx-auto desktop:mt-auto"
        variant={"default"}
        size={"lg"}
        asChild
      >
        <Link href="/">Далее</Link>
      </Button>
    </BackgroundCardLayout>
  );
}
