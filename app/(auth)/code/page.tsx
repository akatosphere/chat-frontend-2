"use client";
import { usePhoneStore } from "@/features/auth/phoneForm/model/store";
import { CodeVerification } from "@/features/code-verification";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  const { phone } = usePhoneStore((state) => state);
  return (
    <BackgroundCardLayout variant="form">
      <Logo size="sm" withTitle={true} className="mb-8" />
      <h3 className="font-semibold subheadline mb-5 desktop:mb-6 text-center">
        Подтвердите вход
      </h3>
      <p className="text text-text minitext text-center">
        Код подтверждения отправлен
        <br /> на следующий номер:
      </p>
      <span>{phone}</span>
      <CodeVerification />
    </BackgroundCardLayout>
  );
}
