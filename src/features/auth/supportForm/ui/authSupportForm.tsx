"use client";
import { useRouter } from "next/navigation";
import z from "zod";

import { sendSupport } from "../api/sendSupport";
import { supportSchema } from "../model/schema";
import { SupportForm } from "./supportForm";

type AuthSupportFormProps = {
  className?: string;
};

export const AuthSupportForm: React.FC<AuthSupportFormProps> = ({ className }) => {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof supportSchema>) => {
    const result = await sendSupport(data);
    if (result.success) {
      router.push("/auth/support/success");
    } else {
      alert(result.error);
    }
  };

  return <SupportForm onSubmit={handleSubmit} className={className} />;
};
