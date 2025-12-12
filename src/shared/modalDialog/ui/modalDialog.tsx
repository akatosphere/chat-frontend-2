import React from 'react'
import { cn } from '@/shared/shadcn/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/shadcn/ui/alert-dialog'
// Импортируем ButtonProps (предполагаем, что вы добавили экспорт в Button.tsx, как обсуждали ранее)
import { Button, type ButtonProps } from '@/shared/shadcn/ui/button'

// 1. CVA для Контента (обертка)
// Ваши стили: "bg-white rounded-lg desktop:rounded-md"
const dialogContentVariants = cva('bg-white rounded-lg desktop:rounded-md', {
  variants: {
    variant: {
      default: 'text-center desktop:text-start',
      vertical: 'text-center desktop:text-start', // Скопировано с default
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

// 2. CVA для Футера
// Ваши стили: "flex-row gap-6 desktop:gap-2 justify-end"
const dialogFooterVariants = cva(
  '', // Базовые классы пустые, всё управление внутри вариантов
  {
    variants: {
      variant: {
        default: 'flex-row gap-6 desktop:gap-2 justify-end',
        vertical: 'flex-row gap-6 desktop:gap-2 justify-end', // Скопировано с default
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

// 3. Конфигурация Кнопок
// Ваши стили: size="sm", className="flex flex-1 desktop:flex-0"
const buttonConfig: Record<string, { size: ButtonProps['size']; className: string }> = {
  default: {
    size: 'sm',
    className: 'flex flex-1 desktop:flex-0',
  },
  vertical: {
    size: 'sm', // Скопировано с default
    className: 'flex flex-1 desktop:flex-0', // Скопировано с default
  },
}

type ModalDialogProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof dialogContentVariants> & {
    className?: string
    title: string
    description: string
    cancelBtnText: string
    actionBtnText: string
    open: boolean
    onOpenChange: (value: boolean) => void
    onConfirm: () => void
  }

export const ModalDialog: React.FC<ModalDialogProps> = ({
  className,
  variant = 'default',
  size,
  title,
  description,
  cancelBtnText,
  actionBtnText,
  open,
  onOpenChange,
  onConfirm,
}) => {
  // Выбираем конфиг кнопок в зависимости от варианта
  const safeVariant = (variant as string) || 'default'
  const currentBtnConfig = buttonConfig[safeVariant] || buttonConfig.default

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn(dialogContentVariants({ variant, size, className }))}>
        <AlertDialogHeader className="mt-2 desktop:mt-0">
          <AlertDialogTitle className="text-tight text-black font-medium">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-gray subtext-tight font-normal desktop:mb-4">
          {description}
        </AlertDialogDescription>

        {/* Применяем стили футера через CVA */}
        <AlertDialogFooter className={cn(dialogFooterVariants({ variant }))}>
          <AlertDialogCancel asChild>
            <Button variant="outline" size={currentBtnConfig.size} className={currentBtnConfig.className}>
              {cancelBtnText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="default"
              size={currentBtnConfig.size}
              className={currentBtnConfig.className}
              onClick={onConfirm}>
              {actionBtnText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
