"use client";

// import { useUserFormStore } from "@/features/auth/model/store";
// import { usePhoneStore } from "@/features/auth/phoneForm/model/store";
// import { PhoneForm } from "@/features/auth/phoneForm/ui/phoneForm";
// import { UserForm } from "@/features/auth/ui/userForm";
// import { FormTextarea } from "@/shared/form/ui/formTextarea";
import { BackgroundPagelayout } from "@/shared/layouts/page/ui/backgroundPageLayout";
import { Toast } from "@/shared/toast/ui/toast";
import { useState } from "react";

export default function Home() {
  // const phone = usePhoneStore((state) => state.phone);
  // const user = useUserFormStore((store) => store.user);
  const [showToast, setShowToast] = useState(false);

  return (
    <BackgroundPagelayout backgrountCardLayout={"form"}>
      {/* тестовая кнопка для тостера */}
      <button className="bg-fuchsia-300 p-2 mr-10 ml-10 text-black font-bold rounded-md" onClick={() => setShowToast(true)}>Показать тостер</button>
      {showToast && (<Toast
        icon={{
          mobile: "/toast/checkCircleMob.png",
          desktop: "/toast/checkCircleDesk.png",
        }}
          duration={3000}
          onClose={() => setShowToast(false)}
        />)}

    </BackgroundPagelayout>
  );
}
