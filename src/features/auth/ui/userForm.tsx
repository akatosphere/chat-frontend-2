"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { FormInput } from "@/shared/form/ui/formInput";
import { firstNameSchema, nickNameSchema } from "../model/validation";

export default function UserForm() {
    // Разделённые состояния для инпутов
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");

    const [nickName, setNickName] = useState("");
    const [nickNameError, setNickNameError] = useState("");

    const [isValid, setIsValid] = useState(false);

    // Загрузка из localStorage при монтировании
useEffect(() => {
    const saved = localStorage.getItem("userForm");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            const fName = parsed.firstName || "";
            const nName = parsed.nickName || "";

            setFirstName(fName);
            setNickName(nName);

            // Валидируем сразу после загрузки
            const fError = validateFirstName(fName);
            const nError = validateNickName(nName);
            setFirstNameError(fError);
            setNickNameError(nError);

            setIsValid(!fError && !nError);

        } catch {
            // игнорируем ошибки парсинга
        }
    }
}, []);

    // Функции валидации конкретного поля
    const validateFirstName = (value: string) => {
        if (!value) return "Заполните поле";
        const result = firstNameSchema.safeParse(value);
        return result.success ? "" : result.error.issues[0].message;
    };

    const validateNickName = (value: string) => {
        if (!value) return "Заполните поле";
        const result = nickNameSchema.safeParse(value);
        return result.success ? "" : result.error.issues[0].message;
    };

    // Обработчики изменения инпутов
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFirstName(val);
        const err = validateFirstName(val);
        setFirstNameError(err);

        localStorage.setItem("userForm", JSON.stringify({ firstName: val, nickName }));

        setIsValid(!err && !nickNameError);
    };

    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNickName(val);
        const err = validateNickName(val);
        setNickNameError(err);

        localStorage.setItem("userForm", JSON.stringify({ firstName, nickName: val }));

        setIsValid(!err && !firstNameError);
    };

    // Сабмит формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;

        console.log("Форма отправлена:", { firstName, nickName });
        // Очистка формы
        setFirstName("");
        setFirstNameError("");
        setNickName("");
        setNickNameError("");
        setIsValid(false);
        localStorage.removeItem("userForm");
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <FormInput
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                label="Введите имя"
                error={firstNameError}
            />
            <FormInput
                id="nickName"
                value={nickName}
                onChange={handleNickNameChange}
                label="Придумайте никнейм"
                error={nickNameError}
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
