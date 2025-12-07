import { Button } from "@/shared/shadcn/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 bg-white px-16 py-32 sm:items-start dark:bg-black">
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
          Нажимая на «Зарегистрироваться», вы соглашаетесь с{" "}
          <Button variant="text" size="inline" className="subtext-tight">
            Пользовательским соглашением
          </Button>
          .
        </p>
      </main>
    </div>
  );
}
