import { cn } from '@/shared/shadcn/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  AlertDialog,
  AlertDialogContent,
} from '@/shared/shadcn/ui/alert-dialog'

const modalDialogVariants = cva('bg-white rounded-lg desktop:rounded-md', {
  variants: {
    variant: {
      default: 'text-center desktop:text-start',
    },
    size: {
      md: 'desktop:w-[400px] desktop:gap-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

type ModalDialogProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof modalDialogVariants> & {
    className?: string
    open: boolean
    onOpenChange: (value: boolean) => void
  }

export const ModalDialog: React.FC<ModalDialogProps> = ({
  className,
  variant,
  size,
  open,
  onOpenChange,
  children
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn(modalDialogVariants({ variant, size, className }))}>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}
