"use client";

import { useState } from "react";
import { FormInput } from "@/shared/form/ui/formInput";
import { Button } from "@/shared/shadcn/ui/button";
import { usePhoneStore } from "../model/store";

export default function PhoneForm() {
    const setPhone = usePhoneStore((state) => state.setPhone);
    const [phone, setLocalPhone] = useState(""); // локальный стейт для инпута

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPhone(phone); // сохраняем в zustand
        console.log("Телефон сохранён:", phone);
        // можно очистить форму, если нужно
        setLocalPhone("");
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <FormInput
                id="1"
                label="Введите номер телефона"
                placeholder="+7 900 000 00 00"
                value={phone}
                onChange={(e) => setLocalPhone(e.target.value)}
            />
            <Button variant="default" size="lg" type="submit">
                Далее
            </Button>
        </form>
    );
}
