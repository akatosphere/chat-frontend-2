import { SupportForm } from "@/features/auth/supportForm/ui/supportForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackAuthHeader } from "@/shared/ui/backAuthHeader";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout variant={"form"} className="pt-6 flex flex-col">
      <BackAuthHeader backHref="/code" className="mb-5" />
      <Logo size="sm" withTitle className="mb-8 hidden desktop:flex" />
      <h3 className="title desktop:subheadline font-medium text-black text-center mb-4">
        Служба поддержки
      </h3>
      <SupportForm className="flex-1 flex flex-col justify-between" />
      <BackButton
        href="/code"
        className="absolute top-0 desktop:left-0 left-4 hidden desktop:block"
      />
    </BackgroundCardLayout>
  );
}
