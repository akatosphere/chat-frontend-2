import PhoneForm from "@/features/auth/ui/phoneForm";
import { FormInput } from "@/shared/form/ui/formInput";
import { Button } from "@/shared/shadcn/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <PhoneForm/>
      </main>
    </div>
  );
}
