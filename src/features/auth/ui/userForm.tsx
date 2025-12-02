"use client";

import { FormInput } from "@/shared/form/ui/formInput";
import { Button } from "@/shared/shadcn/ui/button";
import { useEffect, useState } from "react";
import { userSchema } from "../model/validation";

type user = {
    firstName: string, 
    nickName: string
};

export default function UserForm() {
    const [user, setUser] = useState<user>({firstName: "", nickName: ""})
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("userForm");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUser(parsed as user);
            } catch {
                // если localStorage сломан — игнорируем
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        const updated = { ...user, [id]: value };
        setUser(updated);

        const result = userSchema.safeParse(updated);
        setIsValid(result.success);
    };



    return (
        <form className="flex flex-col gap-2">
            <FormInput id="firstName" value={user.firstName} onChange={handleChange} label="Введите имя" /> 
            <FormInput id="nickName" value={user.nickName} onChange={handleChange} label="Придумайте никнейм" />
            <Button
            variant="default"
            size="lg"
            type="submit"
            disabled={!isValid}
            >
            Далее
            </Button>
        </form>
    )
}