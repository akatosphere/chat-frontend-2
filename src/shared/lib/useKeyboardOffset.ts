// хук для создания отступа, соответствующего размеру клавиатуры на телефоне (чтобы контент не прятался под клавиатуру)
import { useEffect, useState } from 'react'

export function useKeyboardOffset() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const update = () => {
      const offset = window.innerHeight - vv.height - vv.offsetTop

      const keyboardOpen = offset > 0

      document.documentElement.style.setProperty('--keyboard-offset', `${Math.max(0, offset)}px`)

      setIsKeyboardOpen(keyboardOpen)
    }

    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)

    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
    }
  }, [])

  return { isKeyboardOpen }
}
