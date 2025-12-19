import { UserForm } from "@/features/auth/userForm/ui/userForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackAuthHeader } from "@/shared/ui/backAuthHeader";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default async function Page() {
  return (
    <BackgroundCardLayout variant="form" className="pt-6">
      <BackAuthHeader backHref="/auth/code" className="mb-5" />
      <Logo size="sm" withTitle className="desktop:flex mb-8 hidden" />
      <h3 className="subheadline desktop:mb-6 mb-5 text-center font-semibold text-black">
        Личная информация
      </h3>
      <span className="text desktop:mb-6 mb-5 text-center text-black">
        Пожалуйста, заполните данные
      </span>
      <UserForm />
      <BackButton
        href="/auth/code"
        className="desktop:left-0 desktop:block absolute top-0 left-4 hidden"
      />
    </BackgroundCardLayout>
  );
}
