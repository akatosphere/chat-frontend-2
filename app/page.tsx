import { FormInput } from "@/shared/formInput/ui/formInput";
import { Button } from "@/shared/shadcn/ui/button";
import { Input } from "@/shared/shadcn/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Button variant='default' size='lg'>Начать</Button>
        {/* <Button disabled variant='default' size='lg'>Далее</Button>
        <Button variant='default' size='md'>Обратиться в поддержку</Button>
        <Button variant='outline' size='md'>Назад</Button>
        <Button variant='default' size='sm'>Верно</Button>
        <Button variant='outline' size='sm'>Изменить</Button>
        <Button variant='text' size='md'>Отправить новый код</Button>
        <p className="">
        Нажимая на «Зарегистрироваться», вы соглашаетесь 
        с <Button variant='text' size='inline' className="subtext-tight">Пользовательским соглашением</Button>.
        </p> */}
        <FormInput id="1" placeholder="+7 900 000 00 00" label="Введите номер телефона"/>
      </main>
    </div>
  );
}
