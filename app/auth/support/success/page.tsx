import Link from "next/link";

import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Button } from "@/shared/shadcn/ui/button";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";
import { SupportSuccess } from "@/shared/ui/supportSuccess";

export default function Page() {
  return (
    <BackgroundCardLayout variant={"form"} className="pt-[95px]">
      <Logo size="sm" withTitle className="desktop:flex mb-8 hidden" />
      <h3 className="title desktop:subheadline desktop:mb-7 mb-18 text-center font-medium">
        Служба поддержки
      </h3>
      <SupportSuccess />
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
