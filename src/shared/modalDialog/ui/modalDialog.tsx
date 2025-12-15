import { cn } from '@/shared/shadcn/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertDialog, AlertDialogContent } from '@/shared/shadcn/ui/alert-dialog'

const modalDialogVariants = cva('bg-white rounded-lg desktop:rounded-md', {
  variants: {
    variant: {
      default: 'flex flex-col text-center desktop:text-start',
      vertical: 'text-center'
    },
    size: {
      md: 'desktop:w-[400px]',
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

export const ModalDialog: React.FC<ModalDialogProps> = ({ className, variant, size, open, onOpenChange, children }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn(modalDialogVariants({ variant, size, className }))}>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}
