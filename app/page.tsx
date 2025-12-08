"use client";

import { useUserFormStore } from "@/features/auth/model/store";
import { usePhoneStore } from "@/features/auth/phoneForm/model/store";
import { PhoneForm } from "@/features/auth/phoneForm/ui/phoneForm";
import { UserForm } from "@/features/auth/ui/userForm";
import { FormTextarea } from "@/shared/form/ui/formTextarea";
import Link from "next/link";

export default function Home() {
  const phone = usePhoneStore((state) => state.phone);
  const user = useUserFormStore((store) => store.user);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <UserForm />
        <Link href="/start">Авторизация</Link>
      </main>
    </div>
  );
}
