// хук для создания отступа, соответствующего размеру клавиатуры на телефоне (чтобы контент не прятался под клавиатуру)
import { useEffect } from 'react'

export function useKeyboardOffset() {
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const update = () => {
      const offset = window.innerHeight - vv.height - vv.offsetTop

      document.documentElement.style.setProperty('--keyboard-offset', `${Math.max(0, offset)}px`)
    }

    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)

    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
    }
  }, [])
}
