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
    title: string;
    description: string;
    cancelBtnText: string;
    actionBtnText: string;
    open: boolean;
    onOpenChange: (value: boolean) => void;
    onConfirm: () => void;
  };


export const ModalDialog : React.FC<ModalDialogProps> = ({
  className,
  variant,
  size,
  title,
  description,
  cancelBtnText,
  actionBtnText,
  open,
  onOpenChange,
  onConfirm
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className={cn(modalDialogVariants({ variant, size, className }))}>
        <AlertDialogHeader className='mt-2 desktop:mt-0'>
            <AlertDialogTitle className='text-tight text-black font-medium'>
            {title}
            </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className='text-gray subtext-tight font-normal desktop:mb-4'>
            {description}
        </AlertDialogDescription>
        <AlertDialogFooter className='flex-row gap-6 desktop:gap-2 justify-end'>
            <AlertDialogCancel asChild>
            <Button variant="outline" size="sm" className='flex flex-1 desktop:flex-0'>
                {cancelBtnText}
            </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
            <Button 
              variant="default" 
              size="sm" 
              className='flex flex-1 desktop:flex-0'
              onClick={onConfirm}  
            >
                {actionBtnText}
            </Button>
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
};