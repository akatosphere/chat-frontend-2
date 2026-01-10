import { AuthHeader } from "@/features/auth/codeVerification/ui/authHeader";
import { SupportForm } from "@/features/auth/supportForm/ui/supportForm";
import { BackgroundCardLayout } from "@/shared/layouts/card/backgroundCardLayout";

export default function Page() {
  return (
    <BackgroundCardLayout variant={"form"} className="flex flex-col pt-6">
      <AuthHeader
        backHref="/auth/code"
        logoSize="sm"
        className="desktop:justify-center desktop:mt-16 desktop:pr-0 mt-3 justify-end pr-4"
        classBackButton="absolute desktop:left-20 top-2 left-8"
      />
      <h3 className="title desktop:subheadline mb-4 text-center font-medium text-black">
        Служба поддержки
      </h3>
      <SupportForm className="desktop:mx-16 mx-4 mb-10 flex flex-1 flex-col justify-between" />
    </BackgroundCardLayout>
  );
}
