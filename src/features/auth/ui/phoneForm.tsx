"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { usePhoneStore } from "../model/store";
import PhoneInput from "./phoneInput";

export default function PhoneForm() {
    const setPhone = usePhoneStore((state) => state.setPhone);
    const [phone, setLocalPhone] = useState("");

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

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <PhoneInput value={phone} onChange={handlePhoneChange}/>
            <Button variant="default" size="lg" type="submit">
                Далее
            </Button>
        </form>
    );
}
