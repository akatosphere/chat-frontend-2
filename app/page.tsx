import { Button } from "@/shared/shadcn/ui/button";
import { Tooltip } from "@/shared/ui/tooltip";
import Image from "next/image";

export default function Home() {
 return (
  <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black dark:bg-black">
   <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
    <Button variant="default" size="lg">
     Начать
    </Button>
    <Button disabled variant="default" size="lg">
     Далее
    </Button>
    <Button variant="default" size="md">
     Обратиться в поддержку
    </Button>
    <Button variant="outline" size="md">
     Назад
    </Button>
    <Button variant="default" size="sm">
     Верно
    </Button>
    <Button variant="outline" size="sm">
     Изменить
    </Button>
    <Button variant="text" size="md">
     Отправить новый код
    </Button>
    <p className="">
     Нажимая на «Зарегистрироваться», вы соглашаетесь с{" "}
     <Button variant="text" size="inline" className="subtext-tight">
      Пользовательским соглашением
     </Button>
     .
    </p>
    <div className="flex gap-2 items-center justify-center w-full">
     <span className="text font-medium">Введите код</span>
     <Tooltip>
      <p>Код должен содержать только цифры.</p>
      <p>
       Не более 10 запросов кода в час. При превышении — блокировка номера на 60
       минут.
      </p>
     </Tooltip>
    </div>
   </main>
  </div>
 );
}
