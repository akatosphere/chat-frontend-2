"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { usePhoneStore } from "../model/store";
import PhoneInput from "./phoneInput";
import { phoneSchema } from "../model/validation";

export default function PhoneForm() {
    const setPhone = usePhoneStore((state) => state.setPhone);
    const [phone, setLocalPhone] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("phone");
        if (saved) setLocalPhone(saved);
    }, []);

    const handlePhoneChange = (value: string) => {
    setLocalPhone(value);
    localStorage.setItem("phone", value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPhone(phone);
        setLocalPhone("");
    };

    const handleValidate = () => {
        const result = phoneSchema.safeParse(phone);
        if (!result.success && phone) {
            setError(result.error.issues[0].message)
        } else {
            setError("");
        }
    }

    const handleResetErrors = () => {
        setError("")
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <PhoneInput 
                value={phone} 
                onChange={handlePhoneChange} 
                onBlur={handleValidate} 
                onFocus={handleResetErrors} 
                error={error}
            />
            <Button variant="default" size="lg" type="submit">
                Далее
            </Button>
        </form>
    );
}
