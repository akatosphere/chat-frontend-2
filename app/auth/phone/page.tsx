import { PhoneForm } from "@/features/auth/phoneForm/ui/phoneForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout variant="form">
      <Logo size="sm" withTitle={true} className="mb-8" />
      <h3 className="subheadline desktop:mb-6 mb-5 text-center font-semibold text-black">
        Вход/регистрация
      </h3>
      <PhoneForm />
      <BackButton href="/auth" className="desktop:left-0 absolute top-0 left-4" />
    </BackgroundCardLayout>
  );
}
