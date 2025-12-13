'use client'

import { cn } from '@/shared/shadcn/lib/utils'
import { Button } from '@/shared/shadcn/ui/button'
import { usePhoneStore } from '../model/store'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneSchema, PhoneData } from '../model/schema'
import { sendCode } from '../api/sendCode'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { savePhoneToCookie } from '../lib/savePhoneToCookie'
import { PhoneInput } from './phoneInput'
import { ModalDialog } from '@/shared/modalDialog/ui/modalDialog'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/shadcn/ui/alert-dialog'

type PhoneFormProps = {
  className?: string
}

export const PhoneForm: React.FC<PhoneFormProps> = ({ className }) => {
  const setPhone = usePhoneStore(state => state.setPhone)

  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pendingPhone, setPendingPhone] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
    mode: 'onChange',
    defaultValues: { phone: '' },
  })

  const showError = !isFocused && touchedFields.phone ? errors.phone?.message : ''

  const onSubmit = async (data: PhoneData) => {
    setIsLoading(true)
    const result = await sendCode({
      phone_number: data.phone.replaceAll(' ', ''),
      code_length: 5,
    })

    if (result.success) {
      setPhone(data.phone)
      await savePhoneToCookie(data.phone)
      router.push('/auth/code')
    } else {
      alert(result.error)
    }
    setIsLoading(false)
  }

  const openModalHandler = () => {
    const phone = getValues('phone')
    if (!isValid) return

    setPendingPhone(phone)
    setOpenModal(true)
  }

  return (
    <form className={cn('flex flex-col gap-4 h-full', className)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            id="phone"
            value={field.value}
            onChange={field.onChange}
            onBlur={e => {
              setIsFocused(false)
              field.onBlur()
            }}
            onFocus={() => setIsFocused(true)}
            error={field.value && showError}
            disabled={isSubmitting || isLoading}
          />
        )}
      />

      <Button
        variant="default"
        size="lg"
        type="button"
        disabled={!isValid || isSubmitting || isLoading}
        className="desktop:mt-auto"
        onClick={openModalHandler}>
        Далее
      </Button>
      <ModalDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogHeader className="mt-2 desktop:mt-0">
          <AlertDialogTitle className="text-tight text-black font-medium">{pendingPhone}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-gray subtext-tight font-normal desktop:mb-4">
          Номер телефона указан верно?
        </AlertDialogDescription>
        <AlertDialogFooter className="flex-row gap-6 desktop:gap-2 justify-end">
          <AlertDialogCancel asChild>
            <Button variant="outline" size="sm" className="flex flex-1 desktop:flex-0">
              Изменить
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="default"
              size="sm"
              className="flex flex-1 desktop:flex-0"
              onClick={() => handleSubmit(onSubmit)()}>
              Верно
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </ModalDialog>
    </form>
  )
}
