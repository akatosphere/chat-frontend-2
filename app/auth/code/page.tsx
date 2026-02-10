import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CodeVerification } from "@/features/auth/codeVerification";
import { AuthHeader } from "@/features/auth/codeVerification/ui/authHeader";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";

export default async function Page() {
  const cookieStore = await cookies();
  const phone = cookieStore.get("phone")?.value;

  if (!phone?.trim()) {
    redirect("/auth/phone");
  }

  return (
    <BackgroundCardLayout variant="form">
      <AuthHeader
        backHref="/auth/phone"
        withTitle
        logoSize="sm"
        className="desktop:mt-[72px] mt-11"
        classBackButton="absolute desktop:left-20 top-2 left-8"
      />
      <h3 className="subheadline desktop:mb-6 mb-5 text-center font-semibold text-black">
        Подтвердите вход
      </h3>
      <p className="text text-center text-black">
        Код подтверждения отправлен
        <br /> на следующий номер:
      </p>
      <span className="text mt-2 text-center font-medium text-black">{phone}</span>
      <CodeVerification className="desktop:mt-6 mt-7" />
    </BackgroundCardLayout>
  );
}
