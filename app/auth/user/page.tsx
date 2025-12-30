import { AuthHeader } from "@/features/auth/codeVerification/ui/authHeader";
import { UserForm } from "@/features/auth/userForm/ui/userForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";

export default async function Page() {
  return (
    <BackgroundCardLayout variant="form" className="pt-6">
      <AuthHeader
        backHref="/auth/code"
        logoSize="sm"
        className="desktop:justify-center desktop:mt-16 desktop:pr-0 mt-3 justify-end pr-4"
        classBackButton="absolute desktop:left-20 top-2 left-8"
      />
      <h3 className="subheadline desktop:mb-6 mb-5 text-center font-semibold text-black">
        Личная информация
      </h3>
      <span className="text desktop:mb-6 mb-5 text-center text-black">
        Пожалуйста, заполните данные
      </span>
      <UserForm className="desktop:mx-16 mx-4 mb-10" buttonName="Зарегистрироваться" />
    </BackgroundCardLayout>
  );
}
