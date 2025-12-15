import { cn } from '@/shared/shadcn/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertDialog, AlertDialogContent, AlertDialogOverlay } from '@/shared/shadcn/ui/alert-dialog'

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
    overlay?: "screen" | "card"
  }

export const ModalDialog: React.FC<ModalDialogProps> = ({ className, variant, size, open, onOpenChange, overlay = 'screen', children }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn(modalDialogVariants({ variant, size, className }))}>
        {children}
      </AlertDialogContent>
      <AlertDialogOverlay className={`bg-primary/25 backdrop-blur-[2px] ${overlay == 'card' ? '-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 card-not-compressed:max-w-lg w-full h-[95%] max-h-[760px] max-w-[calc(100vw-1.5rem)] rounded-md' : ''}`} />
    </AlertDialog>
  )
}
