import { useEffect, useRef, useState } from 'react'
import { resize } from './helpers'

type useMessageFormOptions = {
  onSubmitMessage: (message: string) => void,
  isKeyboardOpen: boolean
}

export const useMessageForm = ({ onSubmitMessage, isKeyboardOpen }: useMessageFormOptions) => {
  const [textMessage, setTextMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const submitMessage = () => {
    const trimmedMessage = textMessage.trim()
    if (!trimmedMessage) return

    if (isTouchDevice && !isKeyboardOpen) {
      textareaRef.current?.blur()
    }

    onSubmitMessage(trimmedMessage)
    setTextMessage('')

    requestAnimationFrame(() => {
      if (!isTouchDevice || isKeyboardOpen) {
        console.log(isKeyboardOpen)
        textareaRef.current?.focus()
      }
      resize({
        currentTarget: textareaRef.current,
      } as React.FormEvent<HTMLTextAreaElement>)
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitMessage()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTouchDevice) {
      e.preventDefault()
      submitMessage()
    }
  }

  return {
    textMessage,
    setTextMessage,
    textareaRef,
    handleSubmit,
    onKeyDown,
  }
}
