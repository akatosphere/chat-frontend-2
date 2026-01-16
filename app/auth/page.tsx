import Link from "next/link";

import { AuthHeader } from "@/features/auth/codeVerification/ui/authHeader";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";

export default function Page() {
  return (
    <BackgroundCardLayout>
      <AuthHeader logoSize="lg" withTitle className="desktop:mt-[72px] mt-11 mb-4" />
      <div className="desktop:gap-0.5 text-primary-dark flex flex-col gap-1 text-center">
        <span className="text">Привет!</span>
        <span className="text">Давай знакомиться!</span>
      </div>
      <Button
        className="desktop:mt-auto desktop:mb-16 desktop:mx-auto desktop:w-full desktop:max-w-[360px] mx-4 mt-6"
        variant={"default"}
        size={"lg"}
        asChild
      >
        <Link href="/auth/phone">Начать</Link>
      </Button>
    </BackgroundCardLayout>
  );
}
