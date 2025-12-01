import { FormInput } from "@/shared/form/ui/formInput";
import { Button } from "@/shared/shadcn/ui/button";

export default function PhoneForm() {
    return (
        <form className="flex flex-col gap-2">
            <FormInput id="1" label="Введите номер телефона" placeholder="+7 900 000 00 00" value="" error=""/>
            <Button variant='default' size='lg'>Далее</Button>
        </form>
    )
}