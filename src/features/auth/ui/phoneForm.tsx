import { FormInput } from "@/shared/form/ui/formInput";

export default function PhoneForm() {
    return (
        <form>
            <FormInput id="1" label="Введите номер телефона" placeholder="+7 900 000 00 00" value="" error=""/>
        </form>
    )
}