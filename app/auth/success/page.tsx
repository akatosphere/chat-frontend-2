import Image from "next/image";
import Link from "next/link";

import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout className="pt-[95px]" variant={"form"}>
      <Logo size="lg" className="desktop:flex desktop:mb-16 hidden" />
      <Image
        src="/auth/success.svg"
        alt="Успех"
        width={154}
        height={154}
        className="desktop:hidden desktop:mb-0 mx-auto mb-5 object-contain"
      />
      <div className="mb-8 flex flex-col text-center">
        <span className="subheadline mb-4 font-medium text-black">Поздравляем!</span>
        <span className="text text-black">Регистрация прошла успешно</span>
      </div>
      <Button
        className="desktop:max-w-full desktop:mt-auto desktop:mb-20 desktop:mx-16 mx-4 max-w-[329px]"
        variant={"default"}
        size={"lg"}
        asChild
      >
        <Link href="/chat">Далее</Link>
      </Button>
    </BackgroundCardLayout>
  );
}
