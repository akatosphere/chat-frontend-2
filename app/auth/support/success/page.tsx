import Image from "next/image";
import Link from "next/link";

import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout variant={"form"} className="pt-[95px]">
      <Logo size="sm" withTitle className="desktop:flex mb-8 hidden" />
      <h3 className="title desktop:subheadline desktop:mb-7 mb-18 text-center font-medium">
        Служба поддержки
      </h3>
      <Image
        src="/auth/supportSuccess.svg"
        alt="Успех"
        width={66}
        height={66}
        className="mx-auto mb-4 object-contain"
      />
      <span className="title mb-7 text-center font-medium text-black">Обращение отправлено!</span>
      <p className="text mb-6 text-center text-black">
        В ближайшее время вы получите ответ на электронную почту, указанную в обращении
      </p>
      <Button variant={"default"} size={"lg"} asChild className="desktop:mt-auto">
        <Link href="/auth">На главную</Link>
      </Button>
      <BackButton
        href="/auth/support"
        className="desktop:left-0 desktop:block absolute top-0 left-4 hidden"
      />
    </BackgroundCardLayout>
  );
}
