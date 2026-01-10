import Image from "next/image";
import Link from "next/link";

import { AuthHeader } from "@/features/auth/codeVerification/ui/authHeader";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";

export default function Page() {
  return (
    <BackgroundCardLayout variant={"form"} className="pt-[72px]">
      <AuthHeader
        backHref="/auth/support"
        logoSize="sm"
        className="desktop:justify-center desktop:pr-0 desktop:flex mt-3 hidden justify-end pr-4"
        classBackButton="absolute desktop:left-20 top-2 left-8"
      />
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
      <p className="text desktop:mx-16 desktop:px-5 mx-4 mb-6 text-center text-black">
        В ближайшее время вы получите ответ на электронную почту, указанную в обращении
      </p>
      <Button
        variant={"default"}
        size={"lg"}
        asChild
        className="desktop:mt-auto desktop:mx-16 desktop:mb-20 mx-4 mb-48"
      >
        <Link href="/auth">На главную</Link>
      </Button>
    </BackgroundCardLayout>
  );
}
