"use client";

import { usePhoneStore } from "@/features/auth/model/store";
import { PhoneForm } from "@/features/auth/phoneForm/ui/phoneForm";
import { UserForm } from "@/features/auth/ui/userForm";
import { FormTextarea } from "@/shared/form/ui/formTextarea";

export default function Home() {
  const phone = usePhoneStore((state) => state.phone);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <PhoneForm />
        <div>
          <h2>Сохранённый телефон:</h2>
          <p>{phone || "Телефон ещё не введён"}</p>
        </div>
        <UserForm />
        <FormTextarea id="1" label="Опишите проблему" />
      </main>
    </div>
  );
}
