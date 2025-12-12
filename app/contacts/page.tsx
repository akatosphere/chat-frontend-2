"use client";

import { useUserFormStore } from "@/features/auth/model/store";
import { usePhoneStore } from "@/features/auth/phoneForm/model/store";
import { PhoneForm } from "@/features/auth/phoneForm/ui/phoneForm";
import { UserForm } from "@/features/auth/ui/userForm";
import { FormTextarea } from "@/shared/form/ui/formTextarea";
import { NavBar } from "@/shared/navBar/ui/navBar";

export default function Home() {
  const phone = usePhoneStore((state) => state.phone);
  const user = useUserFormStore((store) => store.user);
  return (
    <div>
      {<NavBar/>}
    </div>
  );
}