"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { usePhoneStore } from "../model/store";
import PhoneInput from "./phoneInput";
import { phoneSchema } from "../model/validation";


export default function PhoneForm() {
    const setPhone = usePhoneStore((state) => state.setPhone);

    const [localPhone, setLocalPhone] = useState("");
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("phone");
        if (saved) setLocalPhone(saved);
    }, []);

    const handleChange = (value: string) => {
        setLocalPhone(value);
        localStorage.setItem("phone", value);
        const result = phoneSchema.safeParse(value);
        setIsValid(result.success);
    };

    const handleFocus = () => {
        setError("");
    };

    const handleBlur = () => {
        const result = phoneSchema.safeParse(localPhone);
        if (!result.success && localPhone) {
            setError(result.error.issues[0].message);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;
        setPhone(localPhone);
        setLocalPhone("");
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <PhoneInput
                value={localPhone}
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