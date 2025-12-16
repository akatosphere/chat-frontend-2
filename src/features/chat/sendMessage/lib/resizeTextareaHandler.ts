export const resize: React.FormEventHandler<HTMLTextAreaElement> = e => {
  const el = e.currentTarget
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}
