"use client";
import { usePhoneStore } from "@/features/auth/phoneForm/model/store";
import { CodeVerification } from "@/features/code-verification";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  const { phone } = usePhoneStore((state) => state);
  return (
    <BackgroundCardLayout variant="form">
      <Logo size="sm" withTitle={true} className="mb-8" />
      <h3 className="font-semibold subheadline mb-5 desktop:mb-6 text-center">
        Подтвердите вход
      </h3>
      <p className="text-text text text-center">
        Код подтверждения отправлен
        <br /> на следующий номер:
      </p>
      <span className="text-text text font-medium text-center mt-2">
        {phone}
      </span>
      <CodeVerification className="mt-7 desktop:mt-6" />
      <BackButton
        href="/phone"
        className="absolute top-0 desktop:left-0 left-4"
      />
    </BackgroundCardLayout>
  );
}
