import { CodeVerification } from "@/features/auth/codeVerification";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const phone = cookieStore.get("phone")?.value;

  if (!phone?.trim()) {
    redirect("/auth/phone");
  }

  return (
    <BackgroundCardLayout variant="form">
      <Logo size="sm" withTitle={true} className="mb-8" />
      <h3 className="font-semibold subheadline mb-5 desktop:mb-6 text-center text-black">
        Подтвердите вход
      </h3>
      <p className="text-black text text-center">
        Код подтверждения отправлен
        <br /> на следующий номер:
      </p>
      <span className="text-black text font-medium text-center mt-2">
        {phone}
      </span>
      <CodeVerification className="mt-7 desktop:mt-6" />
      <BackButton
        href="/auth/phone"
        className="absolute top-0 desktop:left-0 left-4"
      />
    </BackgroundCardLayout>
  );
}
