"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const LoginByCodeSchema = z.object({
  phone_number: z.string().regex(/^\+7\d{10}$/, "Неверный номер телефона"),
  code: z.string().length(5, "Код должен быть из 5 цифр"),
});

type LoginByCodeInput = z.infer<typeof LoginByCodeSchema>;

export async function loginByCodeAction(data: LoginByCodeInput) {
  const validated = LoginByCodeSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Неверный код. Повторите попытку",
    };
  }

  const { phone_number, code } = validated.data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/messenger/login/get/token/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number, code }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.error(error);
      return {
        success: false,
        error: error.detail || "Неверный код",
      };
    }

    const { access, refresh } = await res.json();

    if (!access || !refresh) {
      return {
        success: false,
        error: "Неверный код",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: "refresh_token",
      value: refresh,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return {
      success: true,
      access_token: access,
    };
  } catch (err) {
    return {
      success: false,
      error: "Сервер недоступен. Попробуйте позже",
    };
  }
}
