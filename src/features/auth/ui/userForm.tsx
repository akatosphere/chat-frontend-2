"use client";

import { cn } from '@/shared/shadcn/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/shadcn/ui/button";
import { FormInput } from "@/shared/form/ui/formInput";
import { UserFormData, userFormSchema } from "../model/validation";
import { useForm } from 'react-hook-form';
import { useUserFormStore } from '../model/store';


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
            nickname: "",
        },
    });

    const setUser = useUserFormStore((state) => state.setUser);
    const onSubmit = (data: UserFormData) => {
        setUser(data)
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
                id="nickname"
                label="Придумайте никнейм"
                error={errors.nickname?.message}
                {...register("nickname")}
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
