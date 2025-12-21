import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CodeVerification } from "@/features/auth/codeVerification";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default async function Page() {
  const cookieStore = await cookies();
  const phone = cookieStore.get("phone")?.value;

  if (!phone?.trim()) {
    redirect("/auth/phone");
  }

  return (
    <BackgroundCardLayout variant="form">
      <Logo size="sm" withTitle={true} className="mb-8" />
      <h3 className="subheadline desktop:mb-6 mb-5 text-center font-semibold text-black">
        Подтвердите вход
      </h3>
      <p className="text text-center text-black">
        Код подтверждения отправлен
        <br /> на следующий номер:
      </p>
      <span className="text mt-2 text-center font-medium text-black">{phone}</span>
      <CodeVerification className="desktop:mt-6 mt-7" />
      <BackButton href="/auth/phone" className="desktop:left-0 absolute top-0 left-4" />
    </BackgroundCardLayout>
  );
}
