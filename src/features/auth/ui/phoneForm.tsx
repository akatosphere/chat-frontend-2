"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { usePhoneStore } from "../model/store";
import PhoneInput from "./phoneInput";
import { phoneSchema } from "../model/validation";


export default function PhoneForm() {
    const setPhone = usePhoneStore((state) => state.setPhone);

    const [phone, setPhoneState] = useState("");
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("phone");
        if (saved) setPhoneState(saved);
    }, []);

    // При изменении значения просто обновляем стейт
    const handleChange = (value: string) => {
        setPhoneState(value);

        // Если номер полностью валидный — сразу ставим isValid в true
        const result = phoneSchema.safeParse(value);
        setIsValid(result.success);

        // Во время ввода ошибок не показываем
        if (isFocused) setError("");
    };

    // Срабатывает при фокусе
    const handleFocus = () => {
        setIsFocused(true);
        setError(""); // очищаем ошибки
    };

    // Срабатывает при потере фокуса
    const handleBlur = () => {
        setIsFocused(false);

        const result = phoneSchema.safeParse(phone);
        if (!result.success && phone) {
            setError(result.error.issues[0].message);
            setIsValid(false);
        } else {
            setError("");
            setIsValid(result.success);
            if (result.success) localStorage.setItem("phone", phone);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;
        setPhone(phone);
        setPhoneState("");
        setIsValid(false);
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <PhoneInput
                value={phone}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                error={error}
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
    );
}
