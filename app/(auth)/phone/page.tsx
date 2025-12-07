import { PhoneForm } from "@/features/auth/phoneForm/ui/phoneForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout variant="form">
      <Logo size="sm" withTitle={true} className="mb-8" />
      <h3 className="font-semibold subheadline mb-5 desktop:mb-6 text-center">
        Вход/регистрация
      </h3>
      <PhoneForm />
    </BackgroundCardLayout>
  );
}
