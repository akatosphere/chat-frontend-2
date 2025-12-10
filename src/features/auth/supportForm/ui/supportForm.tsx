"use client";
import { FormInput } from "@/shared/form/ui/formInput";
import { FormTextarea } from "@/shared/form/ui/formTextarea";
import { cn } from "@/shared/shadcn/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import z from "zod";
import { supportSchema } from "../model/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendSupport } from "../api/sendSupport";
import { useRouter } from "next/navigation";

type SupportFormProps = {
  className?: string;
};

export const SupportForm: React.FC<SupportFormProps> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
  } = useForm<z.infer<typeof supportSchema>>({
    resolver: zodResolver(supportSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      text: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof supportSchema>) => {
    const isValid = supportSchema.safeParse(data).success;
    if (!isValid) return;
    const result = await sendSupport(data);
    if (result.success) {
      router.push("/auth/support/success");
    } else {
      alert(result.error);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-3 desktop:gap-0 h-full", className)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormInput
        label="Укажите Ваш e-mail"
        placeholder="e-mail"
        id="email"
        {...register("email")}
        error={errors.email?.message}
        className="desktop:mb-3"
      />

      <FormTextarea
        label="Опишите Вашу проблему"
        id="text"
        {...register("text")}
        error={errors.text?.message}
        className="flex-1"
      />

      <p className="minitext font-regular desktop:font-medium  text-gray desktop:mb-5 desktop:mt-2">
        Ознакомьтесь со
        <Link
          href="https://achat.ktsf.ru/faq"
          target="_blank"
          className="text-primary desktop:hover:text-primary-light transition-color duration-200 active:text-primary-light"
        >
           списком известных проблем и их решениями.
        </Link>
      </p>

      <Button
        type="submit"
        className="w-full"
        variant={"default"}
        size={"lg"}
        disabled={!isValid || !isDirty || isSubmitting}
      >
        Отправить
      </Button>
    </form>
  );
};
