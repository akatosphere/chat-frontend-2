import { UserForm } from "@/features/auth/ui/userForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackAuthHeader } from "@/shared/ui/backAuthHeader";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout variant="form" className="pt-6">
      <BackAuthHeader backHref="/code" className="mb-5" />
      <Logo size="sm" withTitle className="mb-8 hidden desktop:flex" />
      <h3 className="font-semibold subheadline mb-5 desktop:mb-6 text-center">
        Личная информация
      </h3>
      <span className="text-black text text-center mb-5 desktop:mb-6">
        Пожалуйста, заполните данные
      </span>
      <UserForm />
      <BackButton
        href="/code"
        className="absolute top-0 desktop:left-0 left-4 hidden desktop:block"
      />
    </BackgroundCardLayout>
  );
}
