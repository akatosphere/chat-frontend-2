"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { UserForm } from "@/features/auth/userForm/ui/userForm";
import { useAuthStore } from "@/shared/api/store";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackAuthHeader } from "@/shared/ui/backAuthHeader";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  const router = useRouter();
  const { accessToken, isInitialized } = useAuthStore();

  useEffect(() => {
    // Если проверка токена завершена и токена нет — редирект
    if (isInitialized && !accessToken) {
      router.replace("/auth/phone");
    }
  }, [isInitialized, accessToken, router]);

  // Пока идет инициализация, ничего не рендерим (или показываем Skeleton/Loader)
  if (!isInitialized) {
    return null; // Или <FullScreenLoader />
  }

  // Если инициализация прошла, но токена нет, useEffect сработает и сделает редирект.
  // Чтобы не мелькал контент формы на долю секунды, проверяем наличие токена.
  if (!accessToken) {
    return null;
  }

  return (
    <BackgroundCardLayout variant="form" className="pt-6">
      <BackAuthHeader backHref="/auth/phone" className="mb-5" />
      <Logo size="sm" withTitle className="desktop:flex mb-8 hidden" />
      <h3 className="subheadline desktop:mb-6 mb-5 text-center font-semibold text-black">
        Личная информация
      </h3>
      <span className="text desktop:mb-6 mb-5 text-center text-black">
        Пожалуйста, заполните данные
      </span>
      <UserForm />
      <BackButton
        href="/auth/phone"
        className="desktop:left-0 desktop:block absolute top-0 left-4 hidden"
      />
    </BackgroundCardLayout>
  );
}
