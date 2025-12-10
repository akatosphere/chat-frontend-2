import { cn } from '@/shared/shadcn/lib/utils';
import { cva, type VariantProps } from "class-variance-authority";
import { AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger } from "@/shared/shadcn/ui/alert-dialog";
import { Button } from '@/shared/shadcn/ui/button';

const modalDialogVariants = cva(
    "bg-white rounded-lg desktop:rounded-md",
  {
    variants: {
      variant: {
        default: "text-center desktop:text-start"
      },
      size: {
        md: "desktop:w-[400px] desktop:gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

type ModalDialogProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof modalDialogVariants> & {
    className?: string;
  };


export const ModalDialog : React.FC<ModalDialogProps> = ({
  className,
  variant,
  size,
}) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger>
        Открыть модалку
        </AlertDialogTrigger>
        <AlertDialogContent className={cn(modalDialogVariants({ variant, size, className }))}>
        <AlertDialogHeader>
            <AlertDialogTitle className='text-tight text-black font-medium'>
            +7 999 999 99 99
            </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className='text-gray subtext-tight font-normal desktop:mb-4'>
            Номер телефона указан верно?
        </AlertDialogDescription>
        <AlertDialogFooter className='flex-row gap-6 desktop:gap-2 justify-end'>
            <AlertDialogCancel asChild>
            <Button variant="outline" size="sm" className='flex flex-1 desktop:flex-0'>
                Изменить
            </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
            <Button variant="default" size="sm" className='flex flex-1 desktop:flex-0'>
                Верно
            </Button>
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
};