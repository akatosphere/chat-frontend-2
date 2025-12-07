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
        md: "desktop:w-[400px]"
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
        <AlertDialogHeader className='text-black'>
            <AlertDialogTitle>
            +7 999 999 99 99
            </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className='text-gray'>
            Номер телефона указан верно?
        </AlertDialogDescription>
        <AlertDialogFooter className='flex-row'>
            <AlertDialogCancel asChild>
            <Button variant="outline" size="sm">
                Изменить
            </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
            <Button variant="default" size="sm">
                Верно
            </Button>
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
};