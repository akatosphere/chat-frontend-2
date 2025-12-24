import { SupportForm } from "@/features/auth/supportForm/ui/supportForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";
import { BackAuthHeader } from "@/shared/ui/backAuthHeader";
import { BackButton } from "@/shared/ui/backButton";
import { Logo } from "@/shared/ui/logo";

export default function Page() {
  return (
    <BackgroundCardLayout variant={"form"} className="flex flex-col pt-6">
      <BackAuthHeader backHref="/auth/code" className="mb-5" />
      <Logo size="sm" withTitle className="desktop:flex mb-8 hidden" />
      <h3 className="title desktop:subheadline mb-4 text-center font-medium text-black">
        Служба поддержки
      </h3>
      <SupportForm className="flex flex-1 flex-col justify-between" />
      <BackButton
        href="/auth/code"
        className="desktop:left-0 desktop:block absolute top-0 left-4 hidden"
      />
    </BackgroundCardLayout>
  );
}
