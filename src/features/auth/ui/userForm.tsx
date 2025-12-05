"use client";

import { cn } from '@/shared/shadcn/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/shadcn/ui/button";
import { FormInput } from "@/shared/form/ui/formInput";
import { UserFormData, userFormSchema } from "../model/validation";
import { useForm } from 'react-hook-form';


type UserFormProps = {
  className?: string,
};

export const UserForm : React.FC<UserFormProps> = ({
  className,
}) => {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        watch
    } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            firstName: "",
            nickName: "",
        },
    });

    const onSubmit = (data: UserFormData) => {
        console.log("Форма отправлена:", data);
        reset();
    }

    watch();

  return (
    <div className={cn("", className)}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                id="firstName"
                label="Введите имя"
                error={errors.firstName?.message}
                {...register("firstName")}
            />
            <FormInput
                id="nickName"
                label="Придумайте никнейм"
                error={errors.nickName?.message}
                {...register("nickName")}
            />
            <Button
                variant="default"
                size="lg"
                type="submit"
                disabled={!isValid}
            >
                Далее
            </Button>
        </form>
    </div>
  );
};
