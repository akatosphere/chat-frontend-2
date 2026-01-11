"use client";
import { useState } from "react";
import z from "zod";

import { SupportSuccess } from "@/shared/ui/supportSuccess";

import { sendSupport } from "../api/sendSupport";
import { supportSchema } from "../model/schema";
import { SupportForm } from "./supportForm";

type ProfileSupportFormProps = {
  className?: string;
};

export const ProfileSupportForm: React.FC<ProfileSupportFormProps> = ({ className }) => {
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (data: z.infer<typeof supportSchema>) => {
    const result = await sendSupport(data);
    if (result.success) {
      setSuccess(true);
    } else {
      alert(result.error);
    }
  };

  if (success) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <SupportSuccess className="" />
      </div>
    );
  }

  return <SupportForm onSubmit={handleSubmit} className={className} />;
};
