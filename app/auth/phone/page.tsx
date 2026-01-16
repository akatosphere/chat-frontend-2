"use client";

import { useEffect } from "react";

import { AuthHeader } from "@/features/auth/codeVerification/ui/authHeader";
import { PhoneForm } from "@/features/auth/phoneForm/ui/phoneForm";
import { logout } from "@/shared/api/logout";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";

export default function Page() {
  useEffect(() => {
    logout();
  }, []);
  return (
    <BackgroundCardLayout variant="form">
      <AuthHeader
        backHref="/auth"
        withTitle
        logoSize="sm"
        className="desktop:mt-[72px] mt-11"
        classBackButton="absolute desktop:left-20 top-2 left-8"
      />
      <h3 className="subheadline desktop:mb-6 mb-5 text-center font-semibold text-black">
        Вход/регистрация
      </h3>
      <PhoneForm className="desktop:mx-16 desktop:mb-20 mx-4" />
    </BackgroundCardLayout>
  );
}
