import {IconPhoto} from "@/shared/ui/icons/photo";

export function EditPhotoForm() {
    return (
        <>
            <div className='flex flex-col mb-4'>
            <div className= 'flex items-center justify-center w-[200px] h-[200px] rounded-full bg-[var(--primary-light)]' >
                <IconPhoto className= 'w-[91px] h-[91px]' />
            </div>
                <label className="block text-center cursor-pointer hover:underline text-[var(--primary)]" role="button">
                    Выбрать фотографию
                    <input type="file" accept="image/*" className="hidden" />
                </label>
            </div>
        </>

    )
}