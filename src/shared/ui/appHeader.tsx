import {Logo} from "@/shared/ui/logo";
import {StoreBadge} from "@/shared/ui/storeBadge";

export function AppHeader() {
    return (
        <header className='max-w-[1260px] h-[60px] mx-auto bg-[#F5F6F8] rounded-sm'>
            <div className='flex justify-between items-center h-full px-4 py-2'>
                <Logo size='xs' />
                <div className='flex gap-2'>
                    <StoreBadge type={'apple'} />
                    <StoreBadge type={'google'} />
                </div>
            </div>
        </header>
    )
}