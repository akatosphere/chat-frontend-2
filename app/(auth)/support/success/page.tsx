import { SupportForm } from "@/features/auth/supportForm/ui/supportForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { BackAuthHeader } from "@/shared/ui/backAuthHeader";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundCardLayout variant={"form"} className="pt-[95px]">
      <Logo size="sm" withTitle className="mb-8 hidden desktop:flex" />
      <h3 className="title desktop:subheadline font-medium mb-17 desktop:mb-7 text-center">
        Служба поддержки
      </h3>
      <Image
        src="/auth/supportSuccess.svg"
        alt="Успех"
        width={66}
        height={66}
        className="mx-auto object-contain mb-4"
      />
      <span className="title font-medium mb-7 text-center">
        Обращение отправлено!
      </span>
      <p className="text text-black text-center mb-6">
        В ближайшее время вы получите ответ на электронную почту, указанную
        в обращении
      </p>
      <Button variant={"default"} size={"lg"} asChild className="mt-auto">
        <Link href="/start">На главную</Link>
      </Button>
      <BackButton
        href="/support"
        className="absolute top-0 desktop:left-0 left-4 hidden desktop:block"
      />
    </BackgroundCardLayout>
  );
}
